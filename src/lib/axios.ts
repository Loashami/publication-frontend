import Axios from "axios"

export const api = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 10000
})
