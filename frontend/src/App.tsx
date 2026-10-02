import { useEffect, useState } from 'react';
import './App.css';
import { checkBackend } from "./services/api";

function App() {
  const [backendStatus, setBackendStatus] = useState("Comprobando conexión..."); 
  const [error, setError] = useState(false);

  useEffect(() => {
    checkBackend() 
      .then((message) => { 
        setBackendStatus(message); 
        setError(false); 
      }) 
      .catch(() => { 
        setBackendStatus("No se ha podido conectar con el backend"); 
        setError(true); 
      }); 
  }, []);

  return (
    <main> 
      <h1>HomeFinder</h1> 
      <h2>Estado del backend</h2> 
      <p style={{ color: error ? "red" : "green" }}> 
        {backendStatus} 
      </p> 
    </main>
  )
}

export default App
