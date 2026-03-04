import axios from "axios";

const BASE_URL =
    // import.meta.env.VITE_BASE_URL ||
    "https://api.fabric.com/v1";

// Create axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Centralized API service
const apiService = async (
    method,
    url,
    { body = null, params = null, headers = {}, responseType = "json" } = {}
) => {
    try {
        const subscription_id = sessionStorage.getItem("subscription_id");
        const token = sessionStorage.getItem("token");

        const requestHeaders = {
            Authorization: token ? `Bearer ${token}` : "",
            "X-Customer-Id": subscription_id || "",
            ...headers,
        };

        const isFormData = body instanceof FormData;

        const response = await axiosInstance({
            method,
            url,
            data: body,
            params,
            headers: {
                ...requestHeaders,
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
            },
            responseType, // json | blob | text
        });

        console.log("📥 API Response:", response.data);
        return response.data;
        
    } catch (error) {
        // Handle token expiration
        if (
            error.response?.data?.message === "Invalid token or signature"
        ) {
            sessionStorage.clear();
            window.location.href = "/";
        }

        // Network error
        if (!error.response) {
            console.error("🌐 Network error:", error.message);
            throw new Error(
                "Network error. Please check your internet connection."
            );
        }

        const errorMessage =
            error.response?.data?.error?.message ||
            error.response?.data?.message ||
            "API request failed";

        console.error(
            `❌ API Error [${error.response.status}]:`,
            error.response.data
        );

        throw new Error(errorMessage);
    }
};

export default apiService;