import axios from "axios";

const springconfig = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

springconfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized - authentication cookie missing or expired");
        }
        return Promise.reject(error);
    }
)

export default springconfig;