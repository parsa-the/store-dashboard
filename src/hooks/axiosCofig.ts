import axios from "axios";

const FetchData = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
})

export default FetchData