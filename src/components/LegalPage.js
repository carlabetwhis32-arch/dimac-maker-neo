import BackButton from "./BackButton";

export default function LegalPage({ title, updated, children }) {
  return (
    <article className="max-w-2xl space-y-6">
      <BackButton />
      <div>
        <h1 className="text-xl font-semibold text-ink">{title}</h1>
        <p className="text-xs text-muted mt-1">
          Última actualización: {updated}
        </p>
      </div>
      <div className="prose-legal space-y-4 text-sm leading-relaxed text-ink [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-1 [&_strong]:font-medium">
        {children}
      </div>
    </article>
  );
}
