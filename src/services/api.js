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
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function loginUser(userData) {
  try {
    const response = await API.post("/users/login", userData);
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getUserProfile() {
  try {
    const response = await API.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
