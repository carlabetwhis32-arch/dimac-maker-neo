import { prisma } from "@/lib/db";
import { updateIntroText } from "./actions";

export const metadata = { title: "Portada — DIMAC MAKER" };

export default async function AdminHomeSettingsPage({ searchParams }) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-xl font-semibold text-ink">Portada</h1>
      <p className="text-sm text-muted">
        Este es el texto corto que aparece justo debajo de la cabecera en la
        página de inicio (máximo una o dos líneas recomendadas).
      </p>

      {searchParams?.saved && (
        <p className="text-sm text-accent-dark bg-accent/10 border border-accent/30 rounded-md px-3 py-2">
          Texto actualizado.
        </p>
      )}
      {searchParams?.error && (
        <p className="text-sm text-accent-dark bg-accent/10 border border-accent/30 rounded-md px-3 py-2">
          {searchParams.error}
        </p>
      )}

      <form action={updateIntroText} className="space-y-4">
        <textarea
          name="introText"
          defaultValue={settings?.introText}
          rows={3}
          required
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-white"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-dark text-white text-sm font-medium px-5 py-2.5 rounded-md"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
