const API_URL = "http://localhost:8080/api";

export async function checkBackend(): Promise<string> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Error al conectar con el backend");
  }

  return response.text();
}

export async function getProperties() {
  const response = await fetch(`${API_URL}/properties`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las viviendas");
  }

  return response.json();
}