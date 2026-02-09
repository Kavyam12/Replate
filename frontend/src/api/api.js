import axios from "axios";

const springconfig = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
});

springconfig.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem("token");

        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => Promise.reject(error)
);

springconfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized - token may be invalid");
        }
        return Promise.reject(error);
    }
)

export default springconfig;