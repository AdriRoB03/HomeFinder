
import { useEffect, useState } from 'react';
import AdminProperties from './AdminProperties';
import './App.css';
import Login from "./Login";
import { checkBackend, getProperties, getPropertyById } from './services/api';

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
  const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
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

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogin = (token: string, username: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setIsAuthenticated(false);
    setShowAdmin(false);
    setSelectedProperty(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <header className="navbar">
        <button
          className="logo"
          onClick={() => {
            setShowAdmin(false);
            setSelectedProperty(null);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Home<span>Finder</span>
        </button>

        <nav>
          <button
            className="nav-link"
            onClick={() => {
              setShowAdmin(false);
              setSelectedProperty(null);

              setTimeout(() => {
                document
                  .getElementById("properties")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 0);
            }}
          >
            Explorar viviendas
          </button>

          <button
            className="nav-link"
            onClick={() => {
              setShowAdmin(false);
              setSelectedProperty(null);

              setTimeout(() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 0);
            }}
          >
            Sobre nosotros
          </button>
        </nav>

        {isAuthenticated ? (
          <>
            <button
              className="login-button"
              onClick={() => setShowAdmin(true)}
            >
              Administración
            </button>

            <button
              className="login-button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            className="login-button"
            onClick={handleLoginClick}
          >
            Iniciar sesión
          </button>
        )}
      </header>

      {!showAdmin && (
        <>  
          <main>
            {selectedProperty ? (
              <section className="detail-section">

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
                              onClick={async () => {
                                try {
                                  const propertyFromBackend = await getPropertyById(property.id);

                                  setSelectedProperty(propertyFromBackend);

                                  window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                  });
                                } catch (error) {
                                  console.error('Error al cargar la vivienda:', error);
                                  alert('No se pudo cargar la información de la vivienda.');
                                }
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
        </>
      )}

      {showAdmin && isAuthenticated && (
        <section className="admin-page">
          <div className="admin-page-header">
            <AdminProperties />
          </div>
        </section>
      )}

      {showLogin && !isAuthenticated && (
        <div
          className="login-modal-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="login-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="login-modal-close"
              onClick={() => setShowLogin(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}

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