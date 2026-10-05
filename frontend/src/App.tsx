
import { useEffect, useState } from 'react';
import './App.css';
import { checkBackend, getProperties } from './services/api';

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



function App() {
  const [backendStatus, setBackendStatus] = useState(
    'Comprobando conexión...'
  );
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('1500');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  
  useEffect(() => {
    checkBackend()
      .then((status) => setBackendStatus(status))
      .catch(() => setBackendStatus('Backend no disponible'));

    getProperties()
      .then((data: Property[]) => setProperties(data))
      .catch((error) => {
        console.error('Error al cargar las viviendas:', error);
      });
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = property.location
      .toLowerCase()
      .includes(location.toLowerCase());

    const matchesPrice = property.price <= Number(maxPrice);

    return matchesLocation && matchesPrice;
  });

  return (
    <div className="app">
      <header className="navbar">
        <a
          className="logo"
          href="#"
          onClick={() => setSelectedProperty(null)}
        >
          Home<span>Finder</span>
        </a>

        <nav>
          <a
            href="#properties"
            onClick={() => setSelectedProperty(null)}
          >
            Explorar viviendas
          </a>
          <a
            href="#about"
            onClick={() => setSelectedProperty(null)}
          >
            Sobre nosotros
          </a>
        </nav>

        <button className="login-button">Iniciar sesión</button>
      </header>

      <main>
        {selectedProperty ? (
          <section className="detail-section">
            <button
              className="back-button"
              onClick={() => setSelectedProperty(null)}
            >
              ← Volver a las viviendas
            </button>

            <div className="detail-card">
              <img
                className="detail-image"
                src={selectedProperty.image}
                alt={selectedProperty.title}
              />

              <div className="detail-info">
                <span className="image-tag">En alquiler</span>

                <p className="property-location">
                  {selectedProperty.location}
                </p>

                <h1>{selectedProperty.title}</h1>

                <p className="detail-price">
                  {selectedProperty.price} € <span>/mes</span>
                </p>

                <div className="detail-features">
                  <div>
                    <span className="feature-icon">🛏️</span>
                    <strong>{selectedProperty.bedrooms}</strong>
                    <span>Dormitorios</span>
                  </div>

                  <div>
                    <span className="feature-icon">🚿</span>
                    <strong>{selectedProperty.bathrooms}</strong>
                    <span>Baños</span>
                  </div>

                  <div>
                    <span className="feature-icon">📐</span>
                    <strong>{selectedProperty.area} m²</strong>
                    <span>Superficie</span>
                  </div>
                </div>

                <div className="detail-description">
                  <h2>Sobre esta vivienda</h2>
                  <p>
                    Descubre este hogar situado en {selectedProperty.location}.
                    Una vivienda de {selectedProperty.area} m², con{' '}
                    {selectedProperty.bedrooms} dormitorios y{' '}
                    {selectedProperty.bathrooms}{' '}
                    {selectedProperty.bathrooms === 1 ? 'baño' : 'baños'}.
                    Ideal para quienes buscan un nuevo espacio al que llamar
                    hogar.
                  </p>
                </div>

                <button
                  className="contact-button"
                  onClick={() =>
                    alert('Próximamente podrás contactar con el propietario.')
                  }
                >
                  Contactar
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="eyebrow">
                  ENCUENTRA TU PRÓXIMO HOGAR
                </span>
                <h1>
                  El lugar perfecto
                  <br />
                  <span>empieza aquí.</span>
                </h1>
                <p>
                  Descubre viviendas en alquiler y encuentra
                  un espacio al que llamar hogar.
                </p>

                <div className="search-box">
                  <div className="search-field">
                    <label htmlFor="location">
                      ¿Dónde quieres vivir?
                    </label>
                    <input
                      id="location"
                      type="text"
                      placeholder="Ej. Sevilla, Triana..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="search-field price-field">
                    <label htmlFor="price">Precio máximo</label>
                    <select
                      id="price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    >
                      <option value="700">700 €/mes</option>
                      <option value="900">900 €/mes</option>
                      <option value="1200">1.200 €/mes</option>
                      <option value="1500">1.500 €/mes</option>
                      <option value="2000">2.000 €/mes</option>
                      <option value="5000">Sin límite</option>
                    </select>
                  </div>

                  <button
                    className="search-button"
                    onClick={() =>
                      document
                        .getElementById('properties')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </section>

            <section className="properties-section" id="properties">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">SELECCIÓN PARA TI</span>
                  <h2>Viviendas destacadas</h2>
                  <p>Explora algunos de los hogares disponibles.</p>
                </div>

                <span className="property-count">
                  {filteredProperties.length} viviendas
                </span>
              </div>

              <div className="property-grid">
                {filteredProperties.map((property) => (
                  <article className="property-card" key={property.id}>
                    <div className="property-image">
                      <img src={property.image} alt={property.title} />
                      <span className="image-tag">En alquiler</span>
                    </div>

                    <div className="property-info">
                      <p className="property-location">
                        {property.location}
                      </p>
                      <h3>{property.title}</h3>

                      <div className="property-features">
                        <span>{property.bedrooms} hab.</span>
                        <span>{property.bathrooms} baños</span>
                        <span>{property.area} m²</span>
                      </div>

                      <div className="property-footer">
                        <p>
                          <strong>{property.price} €</strong>
                          <span>/mes</span>
                        </p>
                        <button
                          className="details-button"
                          onClick={() => {
                            setSelectedProperty(property);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="empty-state">
                  <h3>No se encontraron viviendas</h3>
                  <p>
                    Prueba a cambiar la ubicación o el precio máximo.
                  </p>
                </div>
              )}
            </section>

            <section className="about-section" id="about">
              <h2>Encuentra un lugar que se sienta como tuyo.</h2>
              <p>
                HomeFinder te ayuda a descubrir viviendas y dar
                el siguiente paso hacia tu nuevo hogar.
              </p>
            </section>
          </>
        )}
      </main>

      <footer className="footer">
        <a
          className="logo"
          href="#"
          onClick={() => setSelectedProperty(null)}
        >
          Home<span>Finder</span>
        </a>
        <p>© 2026 HomeFinder. Proyecto de portfolio.</p>
        <span className="backend-status">
          Backend: {backendStatus}
        </span>
      </footer>
    </div>
  );
}

export default App;