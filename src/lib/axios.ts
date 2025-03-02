import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// backend server instance
export const BackendClient = axios.create({
  baseURL: `${backendURL}/MostafaKMilly/demo`,
});
