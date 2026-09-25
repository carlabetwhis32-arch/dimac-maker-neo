/**
 * Formulario reutilizado por /admin/productos/nuevo y /admin/productos/[id].
 * Recibe la Server Action a usar como "action" (createProduct o
 * updateProduct), así el propio formulario no necesita saber si está
 * creando o editando.
 */
export default function ProductForm({ action, categories, product, submitLabel }) {
  return (
    <form action={action} className="space-y-5 max-w-xl">
      {product && <input type="hidden" name="id" value={product.id} />}

      <Field label="Nombre">
        <input
          name="name"
          defaultValue={product?.name}
          required
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Precio (€)">
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price}
            required
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
          />
        </Field>

        <Field label="Categoría">
          <select
            name="categoryId"
            defaultValue={product?.categoryId}
            required
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
          >
            <option value="" disabled>
              Selecciona...
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Enlace de afiliado de Amazon">
        <input
          name="amazonUrl"
          type="url"
          defaultValue={product?.amazonUrl}
          required
          placeholder="https://www.amazon.es/dp/..."
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
        />
      </Field>

      <Field label="Descripción (información técnica y objetiva)">
        <textarea
          name="description"
          defaultValue={product?.description}
          required
          rows={4}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
        />
      </Field>

      <Field label="Comentario DIMAC (¿para qué sirve? ¿en qué proyecto lo usarías?)">
        <textarea
          name="comment"
          defaultValue={product?.comment}
          required
          rows={4}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
        />
      </Field>

      <Field label={product ? "Añadir más imágenes" : "Imágenes"}>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="w-full text-sm"
        />
      </Field>

      <Field label="Estado">
        <select
          name="status"
          defaultValue={product?.status ?? "DRAFT"}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-paper"
        >
          <option value="DRAFT">Borrador</option>
          <option value="PUBLISHED">Publicado</option>
        </select>
      </Field>

      <button
        type="submit"
        className="bg-accent hover:bg-accent-dark text-white text-sm font-medium px-5 py-2.5 rounded-md"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm text-ink mb-1">{label}</span>
      {children}
    </label>
  );
}
