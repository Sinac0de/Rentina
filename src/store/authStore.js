import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, registerUser, getUserProfile } from "../services/api";

// Secure authentication store with persistence
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login function
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await loginUser({ email, password });

          // Ensure we're setting the user correctly
          const user = response.user || response;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          const errorMessage = error.message || "Login failed";
          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            isAuthenticated: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Register function
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await registerUser(userData);

          // Ensure we're setting the user correctly
          const user = response.user || response;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          const errorMessage = error.message || "Registration failed";
          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            isAuthenticated: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Logout function
      logout: () => {
        // Clear token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      // Check if user is authenticated
      checkAuthStatus: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return false;
        }

        set({ isLoading: true });
        try {
          const response = await getUserProfile();

          // Ensure we're setting the user correctly
          const user = response.user || response;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          // Clear tokens on auth failure
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
          return false;
        }
      },

      // Refresh user data
      refreshUser: async () => {
        if (!localStorage.getItem("token")) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        try {
          const response = await getUserProfile();
          const user = response.user || response;

          set({ user, isAuthenticated: true });
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          set({ user: null, isAuthenticated: false });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // Unique name for the storage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // Only persist user and isAuthenticated
    }
  )
);

export default useAuthStore;
