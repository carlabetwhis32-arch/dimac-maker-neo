"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Galería de producto con dos niveles (sección 11 del encargo):
 *
 * 1. Vista en línea: imagen principal + flechas a los lados (si hay más de
 *    una imagen) + miniaturas debajo, todas clicables.
 * 2. Vista ampliada (lightbox): se abre al pulsar la imagen principal.
 *    Desde ahí se puede seguir pasando de foto (flechas o teclado) y
 *    además hay controles de zoom (+/-) y un botón para volver al producto.
 *
 * Es el único componente de cliente de toda la parte pública: todo lo que
 * hace (cambiar de imagen, hacer zoom) solo puede resolverse con
 * JavaScript en el navegador.
 */
export default function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const hasMultiple = images && images.length > 1;

  const goToNext = useCallback(() => {
    if (!images || images.length === 0) return;
    setActiveIndex((i) => (i + 1) % images.length);
    setZoom(1);
  }, [images]);

  const goToPrev = useCallback(() => {
    if (!images || images.length === 0) return;
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
  }, [images]);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setZoom(1);
    setIsLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setZoom(1);
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));

  // Flechas del teclado y Escape, solo mientras el lightbox está abierto.
  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(event) {
      if (event.key === "ArrowRight") goToNext();
      else if (event.key === "ArrowLeft") goToPrev();
      else if (event.key === "Escape") closeLightbox();
      else if (event.key === "+") zoomIn();
      else if (event.key === "-") zoomOut();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrev, closeLightbox]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-paper border border-border rounded-sm flex items-center justify-center text-muted text-sm">
        Sin imagen
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <div>
      {/* --- Vista en línea --- */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => openLightbox(activeIndex)}
          className="block w-full aspect-square overflow-hidden rounded-sm bg-paper border border-border cursor-zoom-in"
          aria-label="Ampliar imagen"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.url}
            alt={productName}
            className="h-full w-full object-cover"
          />
        </button>

        {hasMultiple && (
          <>
            <ArrowButton
              direction="left"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="left-2"
            />
            <ArrowButton
              direction="right"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="right-2"
            />
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex gap-3">
          {images.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setZoom(1);
              }}
              className={`h-16 w-16 overflow-hidden rounded-sm border-2 shrink-0 transition-colors ${
                index === activeIndex ? "border-accent" : "border-border hover:border-muted"
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* --- Lightbox --- */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center">
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Volver al producto"
            className="absolute top-4 left-4 sm:top-6 sm:left-6 text-paper/90 hover:text-paper inline-flex items-center gap-2 text-sm"
          >
            <Icon path="M19 12H5M12 19l-7-7 7-7" />
            Volver
          </button>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
            <IconButton onClick={zoomOut} disabled={zoom <= 1} label="Alejar">
              <Icon path="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM8 11h6" />
            </IconButton>
            <IconButton onClick={zoomIn} disabled={zoom >= 3} label="Acercar">
              <Icon path="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM11 8v6M8 11h6" />
            </IconButton>
          </div>

          {hasMultiple && (
            <>
              <ArrowButton direction="left" onClick={goToPrev} large className="left-3 sm:left-8" />
              <ArrowButton direction="right" onClick={goToNext} large className="right-3 sm:right-8" />
            </>
          )}

          <div className="max-h-[85vh] max-w-[90vw] overflow-auto flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.url}
              alt={productName}
              className="max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-150"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowButton({ direction, onClick, className = "", large = false }) {
  const size = large ? "h-11 w-11" : "h-9 w-9";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Foto anterior" : "Foto siguiente"}
      className={`absolute top-1/2 -translate-y-1/2 ${size} ${className} rounded-full bg-ink/60 hover:bg-ink/80 text-paper flex items-center justify-center transition-colors`}
    >
      <Icon path={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </button>
  );
}

function IconButton({ onClick, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="h-9 w-9 rounded-full bg-ink/60 hover:bg-ink/80 disabled:opacity-30 disabled:hover:bg-ink/60 text-paper flex items-center justify-center transition-colors"
    >
      {children}
    </button>
  );
}

function Icon({ path }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
