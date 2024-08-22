import axios from "axios";

export const customApi = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer your_token_here" // Example for authentication
  },
});
