"use client";

import { useState } from "react";

/**
 * Único componente de cliente de la página de producto: necesita "use client"
 * porque cambiar de miniatura y ampliar la imagen son interacciones que
 * ocurren en el navegador (useState), no algo que se pueda resolver
 * navegando a otra URL como hicimos con CategoryNav.
 */
export default function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-white border border-border rounded-md flex items-center justify-center text-muted text-sm">
        Sin imagen
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsZoomed(true)}
        className="block w-full aspect-square overflow-hidden rounded-md bg-white border border-border cursor-zoom-in"
        aria-label="Ampliar imagen"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active.url}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 shrink-0 ${
                index === activeIndex ? "border-accent" : "border-border"
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

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.url}
            alt={productName}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
