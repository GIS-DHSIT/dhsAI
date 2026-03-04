import apiService from "../api/apiService";
import API_PATHS from "../../constants/apiPaths";


// Configure ADF Credentials
export const configureAdf = async (payload) => {
    const response = await apiService("POST", API_PATHS.AUTHENTICATION.CREATE, {
        body: payload,
    });
    return response.data;
};