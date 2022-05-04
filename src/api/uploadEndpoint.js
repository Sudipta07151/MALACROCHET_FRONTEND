import axios from "axios";
import baseURL from "../config/baseURL";

export default axios.create({
  baseURL: process.env.NODE_ENV === "development" ? baseURL.DEV_URL : baseURL.PROD_URL,
  headers: { "Content-Type": "multipart/form-data" },
});
