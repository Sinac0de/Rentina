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

// Car API functions
export async function getCars(params = {}) {
  try {
    const response = await API.get("/cars", {
      params,
      paramsSerializer: {
        indexes: null, // This ensures arrays are sent as fuel=Petrol&fuel=Diesel instead of fuel[]=Petrol&fuel[]=Diesel
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error.response?.data || { message: "Failed to fetch cars" };
  }
}

export async function getCarById(id) {
  try {
    const response = await API.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error.response?.data || { message: "Failed to fetch car" };
  }
}

export async function getCarCategories() {
  try {
    const response = await API.get("/cars/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching car categories:", error);
    throw error.response?.data || { message: "Failed to fetch car categories" };
  }
}

export async function getCarMakes() {
  try {
    const response = await API.get("/cars/makes");
    return response.data;
  } catch (error) {
    console.error("Error fetching car makes:", error);
    throw error.response?.data || { message: "Failed to fetch car makes" };
  }
}

export async function toggleFavoriteCar(carId) {
  try {
    const response = await API.post(`/cars/${carId}/favorite`);
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error.response?.data || { message: "Failed to toggle favorite" };
  }
}

export async function removeFavoriteCar(carId) {
  try {
    const response = await API.delete(`/cars/${carId}/favorite`);
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error.response?.data || { message: "Failed to remove favorite" };
  }
}

export async function getFavoriteCars() {
  try {
    const response = await API.get("/cars/favorites");
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite cars:", error);
    throw error.response?.data || { message: "Failed to fetch favorite cars" };
  }
}

// Blog API functions
export async function getBlogs(params = {}) {
  try {
    const response = await API.get("/blogs", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error.response?.data || { message: "Failed to fetch blogs" };
  }
}

export async function getBlogById(id) {
  try {
    const response = await API.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error.response?.data || { message: "Failed to fetch blog" };
  }
}

export async function getBlogBySlug(slug) {
  try {
    const response = await API.get(`/blogs/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error.response?.data || { message: "Failed to fetch blog" };
  }
}

export async function getFeaturedBlogs() {
  try {
    const response = await API.get("/blogs/featured");
    return response.data;
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    throw error.response?.data || { message: "Failed to fetch featured blogs" };
  }
}

export async function getBlogCategories() {
  try {
    const response = await API.get("/blogs/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    throw (
      error.response?.data || { message: "Failed to fetch blog categories" }
    );
  }
}

// Favorite API functions
export async function getUserFavorites() {
  try {
    const response = await API.get("/favorites");
    return response.data;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error.response?.data || { message: "Failed to fetch favorites" };
  }
}

export async function addFavorite(carId) {
  try {
    const response = await API.post(`/favorites/${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error.response?.data || { message: "Failed to add favorite" };
  }
}

export async function removeFavorite(carId) {
  try {
    const response = await API.delete(`/favorites/${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error.response?.data || { message: "Failed to remove favorite" };
  }
}

export async function checkFavorite(carId) {
  try {
    const response = await API.get(`/favorites/check/${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error checking favorite:", error);
    throw error.response?.data || { message: "Failed to check favorite" };
  }
}

// Search API functions
export async function globalSearch(query, limit = 10) {
  try {
    const response = await API.get("/search", { params: { q: query, limit } });
    return response.data;
  } catch (error) {
    console.error("Error performing search:", error);
    throw error.response?.data || { message: "Failed to perform search" };
  }
}

export async function searchCars(query, params = {}) {
  try {
    const response = await API.get("/search/cars", {
      params: { q: query, ...params },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching cars:", error);
    throw error.response?.data || { message: "Failed to search cars" };
  }
}

// Stats API functions
export async function getDashboardStats() {
  try {
    const response = await API.get("/stats/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw (
      error.response?.data || { message: "Failed to fetch dashboard stats" }
    );
  }
}

export async function getCarStats() {
  try {
    const response = await API.get("/stats/cars");
    return response.data;
  } catch (error) {
    console.error("Error fetching car stats:", error);
    throw error.response?.data || { message: "Failed to fetch car stats" };
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

export async function updateUserProfile(userData) {
  try {
    const response = await API.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
}

export default API;
