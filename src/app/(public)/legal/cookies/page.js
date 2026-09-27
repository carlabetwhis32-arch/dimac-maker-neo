import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Política de cookies — DIMAC MAKER" };

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated="[27/09/2026]">
      <h2>¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu
        navegador para recordar cierta información entre visitas.
      </p>

      <h2>Cookies que usa DIMAC MAKER</h2>
      <p>
        Actualmente esta web usa exclusivamente una cookie técnica,
        estrictamente necesaria, llamada <code>dimac_session</code>. Solo se
        crea cuando alguien inicia sesión en el panel privado de
        administración (<code>/admin</code>) y sirve únicamente para
        mantener esa sesión iniciada. No se usa con fines publicitarios ni
        de seguimiento, y no se genera al navegar por la web pública.
      </p>
      <p>
        Al tratarse de una cookie técnica estrictamente necesaria para el
        funcionamiento del sitio, la normativa (LSSI-CE) no exige solicitar
        consentimiento previo para su uso.
      </p>

      <h2>Cookies de terceros</h2>
      <p>
        DIMAC MAKER no instala cookies de análisis (como Google Analytics)
        ni de publicidad en esta versión. Amazon, una vez el usuario pulsa
        "Comprar en Amazon" y sale de este sitio, puede instalar sus propias
        cookies conforme a su propia política, ajena a DIMAC MAKER.
      </p>

      <h2>Si esto cambia</h2>
      <p>
        Si en el futuro se incorporan cookies de análisis o publicidad, esta
        página se actualizará y se implementará el correspondiente aviso de
        consentimiento antes de activarlas.
      </p>
    </LegalPage>
  );
}
