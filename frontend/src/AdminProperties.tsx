import { useEffect, useState } from "react";
import {
  createProperty,
  deleteProperty,
  getProperties,
  updateProperty,
} from "./services/api";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
};

type PropertyForm = {
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
};

const emptyForm: PropertyForm = {
  title: "",
  location: "",
  price: 0,
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  image: "",
};

function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState<PropertyForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadProperties() {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error al cargar las viviendas:", error);
    }
  }

  useEffect(() => {
    async function loadInitialProperties() {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error al cargar las viviendas:", error);
      }
    }

    loadInitialProperties();
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:
        name === "price" ||
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "area"
          ? Number(value)
          : value,
    }));
  }

  function startEditing(property: Property) {
    setEditingId(property.id);

    setForm({
      title: property.title,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      image: property.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      if (editingId === null) {
        await createProperty(form);
        alert("Vivienda creada correctamente.");
      } else {
        await updateProperty(editingId, form);
        alert("Vivienda actualizada correctamente.");
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadProperties();
    } catch (error) {
      console.error("Error al guardar la vivienda:", error);
      alert("No se pudo guardar la vivienda.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar esta vivienda?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProperty(id);

      setProperties((currentProperties) =>
        currentProperties.filter((property) => property.id !== id)
      );

      if (editingId === id) {
        cancelEditing();
      }

      alert("Vivienda eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la vivienda:", error);
      alert("No se pudo eliminar la vivienda.");
    }
  }

  return (
    <section className="admin-section" id="administracion">
      <div className="admin-container">

        <div className="admin-header">
          <div>
            <p className="admin-label">PANEL DE ADMINISTRACIÓN</p>

            <h2>Gestionar viviendas</h2>

            <p>
              Crea, modifica o elimina las viviendas almacenadas
              en HomeFinder.
            </p>
          </div>
        </div>

        <form
          className="property-form"
          onSubmit={handleSubmit}
        >
          <h3>
            {editingId === null
              ? "Añadir nueva vivienda"
              : "Editar vivienda"}
          </h3>

          <div className="form-grid">

            <div className="form-group">
              <label htmlFor="title">
                Título
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Ej. Piso moderno en el centro"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Ubicación
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="Ej. Sevilla, Centro"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">
                Precio mensual (€)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">
                Habitaciones
              </label>

              <input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                value={form.bedrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">
                Baños
              </label>

              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="area">
                Superficie (m²)
              </label>

              <input
                id="area"
                name="area"
                type="number"
                min="0"
                value={form.area}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="image">
                URL de la imagen
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                required
              />
            </div>

          </div>

          <div className="form-actions">

            <button
              type="submit"
              className="admin-submit-button"
              disabled={loading}
            >
              {loading
                ? "Guardando..."
                : editingId === null
                ? "Crear vivienda"
                : "Guardar cambios"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="admin-cancel-button"
                onClick={cancelEditing}
              >
                Cancelar
              </button>
            )}

          </div>
        </form>

        <div className="admin-list">

          <div className="admin-list-header">
            <h3>Viviendas actuales</h3>

            <span>
              {properties.length} vivienda
              {properties.length !== 1 ? "s" : ""}
            </span>
          </div>

          {properties.length === 0 ? (
            <p className="empty-properties">
              No hay viviendas registradas.
            </p>
          ) : (
            <div className="admin-property-grid">

              {properties.map((property) => (
                <article
                  className="admin-property-card"
                  key={property.id}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                  />

                  <div className="admin-property-content">

                    <h4>{property.title}</h4>

                    <p className="admin-location">
                      {property.location}
                    </p>

                    <p className="admin-price">
                      {property.price} €/mes
                    </p>

                    <p className="admin-features">
                      {property.bedrooms} hab. ·{" "}
                      {property.bathrooms} baños ·{" "}
                      {property.area} m²
                    </p>

                    <div className="admin-card-actions">

                      <button
                        type="button"
                        className="edit-button"
                        onClick={() =>
                          startEditing(property)
                        }
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          handleDelete(property.id)
                        }
                      >
                        Eliminar
                      </button>

                    </div>

                  </div>
                </article>
              ))}

            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default AdminProperties;