const API_URL = "http://localhost:8080/api";

export async function checkBackend(): Promise<string> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("No se pudo conectar con el backend");
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

export async function getPropertyById(id: number) {
  const response = await fetch(`${API_URL}/properties/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la vivienda");
  }

  return response.json();
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  return response.json();
}

function getToken() {
  return localStorage.getItem("token");
}

function getAuthHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createProperty(property: {
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}) {
  const response = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(property),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la vivienda");
  }

  return response.json();
}

export async function updateProperty(
  id: number,
  property: {
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
  }
) {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(property),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar la vivienda");
  }

  return response.json();
}

export async function deleteProperty(id: number) {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la vivienda");
  }
}