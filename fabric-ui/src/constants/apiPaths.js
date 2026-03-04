const API_PATHS = {
    PIPELINE: {
        PIPELINES: "pipeline/pipelines",
        CREATE_PIPELINE: "pipeline/create",
        PIPELINE_BY_ID: (pipelineId) => `pipeline/${pipelineId}`,
        DELETE: (pipelineId) => `pipeline/${pipelineId}`,
    },
    AUTHENTICATION: {
        CREATE: "authentication/configure-adf",
    },
    MIGRATION: {
        MIGRATE: "migration/migrate",
        LIST_ADF: "migration/list-adf",
        ADF_PIPELINES: "migration/adf-pipelines",
        FABRIC_WORKSPACES: "migration/fabric-workspaces",
    },
};

export default API_PATHS;
