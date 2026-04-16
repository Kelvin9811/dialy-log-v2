import { useState } from "react";
import ControlPanel from "./ControlPanel.jsx";
import "./App.css";

const defaultCredentials = {
  username: "",
  password: "",
};

function App() {
  const [credentials, setCredentials] = useState(defaultCredentials);
  const [activeUser, setActiveUser] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedUser = credentials.username.trim();

    if (!trimmedUser) {
      return;
    }

    setActiveUser(trimmedUser);
    setCredentials(defaultCredentials);
  };

  const handleLogout = () => {
    setActiveUser("");
  };

  if (activeUser) {
    return <ControlPanel activeUser={activeUser} onLogout={handleLogout} />;
  }

  return (
    <main className="login-shell">
      <section className="login-layout">
        <section className="login-card">
          <div className="login-heading">
            <p className="login-section-label">Iniciar sesion</p>
            <h2>Bienvenido</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Usuario</span>
              <input
                autoComplete="username"
                name="username"
                onChange={handleChange}
                placeholder="ej. Kelvin"
                type="text"
                value={credentials.username}
              />
            </label>

            <label className="login-field">
              <span>Contrasena</span>
              <input
                autoComplete="current-password"
                name="password"
                onChange={handleChange}
                placeholder="Escribe cualquier texto"
                type="password"
                value={credentials.password}
              />
            </label>

            <button className="login-button" type="submit">
              Entrar al panel
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default App;
