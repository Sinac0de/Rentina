import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to include auth token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh/expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized responses
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export async function getCars(id) {
  try {
    const url = id ? `/cars/${id}` : "/cars";
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    alert("Something went wrong! Please refresh the page.");
  }
}

export async function getCarsSpecs() {
  try {
    const response = await API.get("/cars");
    const data = response.data;

    // Gather all the specs of cars
    const carsSpecs = [];
    data.forEach((car) => {
      carsSpecs.push(car.specs);
    });
    return carsSpecs;
  } catch (error) {
    console.error("Error fetching car specs:", error);
    alert("Something went wrong! Please refresh the page.");
  }
}

/* Search cars by name */
export async function getCarsByName(name) {
  try {
    const response = await API.get("/cars");
    const data = response.data;

    const cars = data.filter((car) => {
      const carName = `${car.make.toLowerCase()} ${car.model.toLowerCase()}`;
      return carName.includes(name.toLowerCase());
    });
    return cars;
  } catch (error) {
    console.error("Error searching cars:", error);
    alert("Something went wrong! Please refresh the page.");
  }
}

// User authentication functions
export async function registerUser(userData) {
  try {
    const response = await API.post("/users/register", userData);
    const data = response.data;

    // Save token to localStorage if provided
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
}

export async function loginUser(userData) {
  try {
    const response = await API.post("/users/login", userData);
    const data = response.data;

    // Save token to localStorage if provided
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
}

export async function getUserProfile() {
  try {
    const response = await API.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
}
