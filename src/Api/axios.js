import axios from "axios";
import { BASE_URL } from "./baseurl";



const service = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  
  export default service;