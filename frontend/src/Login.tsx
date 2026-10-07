import { useState } from "react";
import { login } from "./services/api";

interface LoginProps {
  onLogin: (token: string, username: string, role: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const data = await login(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      onLogin(data.token, data.username, data.role);
    } catch {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-icon">
          🔐
        </div>

        <h2>Iniciar sesión</h2>

        <p className="login-subtitle">
          Accede al panel de administración de HomeFinder
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">
              Usuario
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Introduce tu usuario"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Introduce tu contraseña"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            className="login-submit"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="login-footer">
          Panel de administración · HomeFinder
        </p>
      </div>
    </section>
  );
}

export default Login;