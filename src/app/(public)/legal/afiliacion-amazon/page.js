import LegalPage from "@/components/LegalPage";
import { AMAZON_DISCLOSURE } from "@/lib/legalText";

export const metadata = { title: "Afiliación con Amazon — DIMAC MAKER" };

export default function AfiliacionAmazonPage() {
  return (
    <LegalPage title="Afiliación con Amazon" updated="[27/09/2026]">
      <p className="font-medium">{AMAZON_DISCLOSURE}</p>

      <p>
        DIMAC MAKER participa en el Programa de Afiliados de Amazon EU, un
        programa de publicidad para afiliados diseñado para ofrecer a los
        sitios web un modo de obtener comisiones por publicidad, publicitando
        e incluyendo enlaces a Amazon.es.
      </p>

      <h2>¿Qué significa esto en la práctica?</h2>
      <p>
        Cada botón "Comprar en Amazon" de esta web contiene un enlace de
        afiliado. Si accedes a Amazon a través de ese enlace y completas una
        compra que cumple los requisitos del programa, DIMAC MAKER recibe
        una pequeña comisión de Amazon. Esto no supone ningún coste
        adicional para ti: el precio que pagas en Amazon es el mismo que si
        hubieras entrado directamente.
      </p>

      <h2>Sobre las recomendaciones</h2>
      <p>
        Los productos mostrados en DIMAC MAKER se seleccionan por su
        relevancia para proyectos Maker. La ficha técnica de cada producto
        procede de la información pública del fabricante o del propio
        listado de Amazon; el "Comentario DIMAC" es una valoración práctica
        propia sobre para qué puede servir el producto, sin dar a entender
        en ningún caso un uso personal que no se haya realizado realmente.
      </p>

      <h2>Independencia de Amazon</h2>
      <p>
        DIMAC MAKER no es Amazon ni está gestionado por Amazon. Amazon, el
        logotipo de Amazon y las marcas relacionadas son propiedad de
        Amazon.com, Inc. o sus filiales.
      </p>
    </LegalPage>
  );
}
