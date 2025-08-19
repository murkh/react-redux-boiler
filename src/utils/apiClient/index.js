import axios from "axios";
import { configKeys } from "../config";
import RequestBuilder from "./requestBuilder";

export const client = axios.create({
  baseURL: configKeys.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const apiBuilder = new RequestBuilder();
