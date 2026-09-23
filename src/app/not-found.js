import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-site mx-auto px-6 py-24 text-center space-y-3">
      <p className="text-sm tracking-wide font-semibold text-ink">
        DIMAC — MAKER
      </p>
      <h1 className="text-lg text-ink">No hemos encontrado esta página.</h1>
      <Link href="/" className="text-sm text-accent-dark underline">
        Volver a la portada
      </Link>
    </div>
  );
}
