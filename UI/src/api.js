import axios from "axios";

// const API_URL = "http://localhost:5294/api/Users";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5294",
});

// Add token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Users API
export const getUsers = () => api.get("/api/Users");
export const getUser = (id) => api.get(`/api/Users/${id}`);
export const createUser = (user) => api.post("/api/Users", user);
export const updateUser = (id, user) => api.put(`/api/Users/${id}`, user);
export const deleteUser = (id) => api.delete(`/api/Users/${id}`);

// Login API
export async function login(username, password) {
  const response = await fetch(
    "http://localhost:5294/api/Auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password,
      }),
    }
  );

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("jwtToken", data.token);
  }

  return data;
}