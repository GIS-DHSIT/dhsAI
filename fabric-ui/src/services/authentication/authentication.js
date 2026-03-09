import apiService from "../api/apiService";
import API_PATHS from "../../constants/apiPaths";


// Configure ADF Credentials
export const configureAdf = async (payload) => {
    const response = await apiService("POST", API_PATHS.AUTHENTICATION.CREATE, {
        body: payload,
    });
    return response.data;
};

// Handle Migration Process
export const handleMigration = async (payload) => {
    const response = await apiService("POST", API_PATHS.MIGRATION.MIGRATE, {
        body: payload,
    });
    return response.data;
};

// Fetch Data Factory Pipelines
export const fetchAdfPipelines = async () => {
    return await apiService("GET", API_PATHS.MIGRATION.ADF_PIPELINES);
};

// Fetch Fabric Workspaces
export const fetchFabricWorkspaces = async () => {
    return await apiService("GET", API_PATHS.MIGRATION.FABRIC_WORKSPACES);
};

// Fetch ADF List
export const fetchAdfList = async () => {
    return await apiService("GET", API_PATHS.MIGRATION.LIST_ADF);
};

