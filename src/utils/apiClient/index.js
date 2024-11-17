import axios from "axios";
import { configKeys } from "../config";

export const client = axios.create({
  baseURL: configKeys.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
