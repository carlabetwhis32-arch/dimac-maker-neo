"use client";

/**
 * Pequeño componente de cliente (el único motivo para "use client" aquí es
 * poder llamar a window.confirm antes de enviar el formulario). El envío en
 * sí sigue siendo un <form action={serverAction}> normal.
 */
export default function ConfirmSubmitButton({
  children,
  confirmMessage = "¿Seguro que quieres continuar?",
  className,
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
