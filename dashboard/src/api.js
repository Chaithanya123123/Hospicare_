// Set VITE_API_URL at build time when the API is not on this computer.
export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export const errorMessage = (error) =>
  error.response?.data?.message ||
  "Cannot reach the server. Please try again in a moment.";
