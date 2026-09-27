import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Aviso legal — DIMAC MAKER" };

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" updated="[27/09/2026]">
      <p>
        <strong>
          
        </strong>
      </p>

      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
        Servicios de la Sociedad de la Información y de Comercio Electrónico
        (LSSI-CE), se informa de los siguientes datos:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Titular: [DIMAC]</li>
        <li>NIF/CIF: [-]</li>
        <li>Domicilio: [España]</li>
        <li>Correo electrónico de contacto: [dimac.oficial@gmail.com]</li>
        <li>
          Datos registrales (si aplica, p. ej. si operas como autónomo o
          sociedad dado de alta): [-]
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        DIMAC MAKER es un sitio web de recomendaciones sobre productos
        relacionados con el mundo Maker (impresión 3D, electrónica,
        cableado, herramientas, mecánica, robótica...). DIMAC MAKER no vende
        productos directamente: se limita a mostrar información y enlaces
        que dirigen a Amazon, donde se completa la compra. Consulta también
        la página{" "}
        <a href="/legal/afiliacion-amazon" className="underline">
          Afiliación con Amazon
        </a>
        .
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario y
        supone la aceptación de las condiciones incluidas en este Aviso
        Legal. El usuario se compromete a hacer un uso adecuado de los
        contenidos y a no emplearlos para incurrir en actividades ilícitas,
        contrarias a la buena fe o al orden público.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Los textos, comentarios e imágenes propias de DIMAC MAKER son
        propiedad de [DIMAC], salvo que se
        indique lo contrario. Las imágenes y datos de producto proceden, en
        parte, de sus fabricantes o de Amazon, y se muestran a título
        informativo.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        DIMAC MAKER no se hace responsable de la disponibilidad, precios o
        condiciones de los productos mostrados, que son gestionados
        íntegramente por Amazon. Tampoco gestiona pedidos, pagos, envíos ni
        incidencias relacionadas con las compras, que deben resolverse
        directamente con Amazon.
      </p>

      <h2>6. Legislación aplicable</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para
        cualquier controversia derivada del uso de este sitio web, las
        partes se someterán a los juzgados y tribunales que correspondan
        conforme a derecho.
      </p>
    </LegalPage>
  );
}
