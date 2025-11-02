import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
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
    // For global search, we'll search blogs through the global search endpoint
    // and cars through the getCars function with search parameters
    const [carsResponse, globalResponse] = await Promise.all([
      getCars({ search: query, limit: limit }),
      API.get("/search", { params: { q: query, limit } }),
    ]);

    return {
      cars: carsResponse.cars || carsResponse || [],
      blogs: globalResponse.data.blogs || [],
    };
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

// Rental API functions
export async function createRental(rentalData) {
  try {
    console.log("API call - Sending rental data:", rentalData);
    const response = await API.post("/rentals", rentalData);
    console.log("API call - Received response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating rental:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Error headers:", error.response?.headers);

    // If it's a 401 error, it might be an authentication issue
    if (error.response?.status === 401) {
      throw { message: "Authentication required. Please log in again." };
    }

    // If it's a 400 error, it might be a validation issue
    if (error.response?.status === 400) {
      const errorMessage =
        error.response.data?.error || "Invalid data provided.";
      throw { message: `Validation Error: ${errorMessage}` };
    }

    // If it's a 404 error, the car might not exist
    if (error.response?.status === 404) {
      throw {
        message: "Car not found. Please try again with a different car.",
      };
    }

    throw error.response?.data || { message: "Failed to create rental" };
  }
}

export async function getUserRentals() {
  try {
    const response = await API.get("/rentals");
    return response.data;
  } catch (error) {
    console.error("Error fetching user rentals:", error);
    throw error.response?.data || { message: "Failed to fetch rentals" };
  }
}

// Rented Cars API functions
export async function getUserRentedCars() {
  try {
    const response = await getUserRentals();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching user rented cars:", error);
    throw error.response?.data || { message: "Failed to fetch rented cars" };
  }
}

export default API;
