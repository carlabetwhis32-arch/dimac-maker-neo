import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Política de privacidad — DIMAC MAKER" };

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated="[FECHA]">
      <p>
        <strong>
          ⚠️ Plantilla base a revisar y completar con tus datos reales (ver
          README).
        </strong>
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Responsable: [NOMBRE Y APELLIDOS O RAZÓN SOCIAL]</li>
        <li>Contacto: [EMAIL DE CONTACTO]</li>
      </ul>

      <h2>2. Qué datos tratamos</h2>
      <p>
        En esta primera versión, DIMAC MAKER no tiene registro de usuarios,
        formularios de contacto ni comentarios públicos, por lo que no
        recopila datos personales de los visitantes más allá de los propios
        de la navegación (ver la{" "}
        <a href="/legal/cookies" className="underline">
          Política de Cookies
        </a>
        ). Si en el futuro se añaden formularios, newsletter o cuentas de
        usuario, esta política se actualizará para reflejarlo.
      </p>

      <h2>3. Finalidad</h2>
      <p>
        Los únicos datos técnicos tratados (cookies estrictamente
        necesarias) tienen como finalidad el funcionamiento básico del
        sitio. No se realiza publicidad personalizada ni perfilado de
        usuarios.
      </p>

      <h2>4. Derechos de las personas usuarias</h2>
      <p>
        Cualquier persona tiene derecho a acceder, rectificar y suprimir sus
        datos, así como a solicitar la limitación, oposición o portabilidad
        de los mismos, escribiendo a [EMAIL DE CONTACTO]. También tiene
        derecho a presentar una reclamación ante la Agencia Española de
        Protección de Datos (www.aepd.es) si considera que el tratamiento no
        se ajusta a la normativa vigente.
      </p>

      <h2>5. Amazon y enlaces de afiliado</h2>
      <p>
        Al pulsar "Comprar en Amazon" el usuario abandona DIMAC MAKER y pasa
        a navegar en Amazon, sujeto a la política de privacidad propia de
        Amazon. DIMAC MAKER no recibe datos personales de las compras
        realizadas, solo información agregada sobre si una compra se ha
        producido a través de sus enlaces, a efectos de la comisión de
        afiliado.
      </p>

      <h2>6. Cambios en esta política</h2>
      <p>
        Esta política puede actualizarse para adaptarse a novedades
        legislativas o a cambios en el funcionamiento del sitio. Se
        recomienda revisarla periódicamente.
      </p>
    </LegalPage>
  );
}
