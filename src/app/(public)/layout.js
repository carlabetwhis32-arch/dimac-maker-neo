import Header from "@/components/Header";
import Footer from "@/components/Footer";

// "(public)" es un route group: no añade ningún segmento a la URL
// (la portada sigue siendo "/", no "/(public)"). Solo sirve para darle a
// este subárbol de páginas su propio layout, distinto del de /admin.
export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-site mx-auto px-6 py-10 min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
