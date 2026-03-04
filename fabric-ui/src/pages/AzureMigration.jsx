import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Card,
    CardContent,
    Stepper,
    Step,
    StepLabel,
    AppBar,
    Toolbar,
    Container,
    Paper,
    Grid,
    FormControl,
    Select,
    OutlinedInput,
    Autocomplete,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import CloudIcon from "@mui/icons-material/Cloud";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import StorageIcon from "@mui/icons-material/Storage";
import LayersIcon from "@mui/icons-material/Layers";
import FolderIcon from "@mui/icons-material/Folder";
import CheckBoxDropdown from "../components/CheckBoxDropdown";
import DragDropUpload from "../components/DragDropUpload";
import { configureAdf } from "../services/authentication/authentication";


const StepIconRoot = styled("div")(({ ownerState }) => ({
    width: 35,
    height: 35,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 15,
    transition: "all 0.4s ease",
    color: "#fff",

    background: ownerState.active
        ? "linear-gradient(135deg, #1e5bb5, #2e7df7)"
        : ownerState.completed
            ? "linear-gradient(135deg, #1e5bb5, #2e7df7)"
            : "#e5e7eb",

    boxShadow: ownerState.active
        ? "0 0 0 4px rgba(47,111,214,0.2)"
        : ownerState.completed
            ? "0 4px 16px rgba(46, 125, 247, 0.4);"
            : "none",
}));

function CustomStepIcon(props) {
    const { active, completed, icon } = props;

    return (
        <StepIconRoot ownerState={{ active, completed }}>
            {completed ? "✓" : icon}
        </StepIconRoot>
    );
}

const AzureMigration = () => {

    const steps = [
        { step: "STEP 1", title: "Authentication", summary: "Azure Credentials & Configuration" },
        { step: "STEP 2", title: "Migration Config", summary: "Pipeline Selection & Migration Config" },
        { step: "STEP 3", title: "Processing", summary: "Migration Completed" },
    ];

    const [comeBack, setComeback] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        tenantId: "",
        clientId: "",
        clientSecret: "",
        subscription: "",
    });

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    console.log("Form Data:", formData);

    const handleCreate = async () => {
        try {
            if (activeStep == 0) {
                const { tenantId, clientId, clientSecret, subscription } = formData;

                // Validation
                const isFormValid =
                    tenantId?.trim() &&
                    clientId?.trim() &&
                    clientSecret?.trim() &&
                    subscription?.trim();

                if (!isFormValid) {
                    setError("All Azure credentials are required.");
                    return;
                }

                setLoading(true);
                setError(null);

                const payload = {
                    tenantId,
                    clientId,
                    clientSecret,
                    azureSubscriptionId: subscription,
                };

                const response = await configureAdf(payload);

                console.log("ADF Configuration Response:", response);
            }

            handleNext();
        } catch (error) {
            console.error("ADF Configuration Failed:", error);
            setError("Failed to configure Azure. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const azureDataFactoryOptions = [
        { id: 1, label: "adf-production-westeu", value: "adf1" },
        { id: 2, label: "adf-production-eastus", value: "adf2" },
        { id: 3, label: "adf-dev-easteu", value: "adf3" },
        { id: 4, label: "adf-staging-central", value: "adf4" },
        { id: 5, label: "adf-analytics-global", value: "adf5" },
        { id: 6, label: "adf-finance-reporting", value: "adf6" },
    ];

    const fabricWorkspacesOptions = [
        { id: 1, label: "Fabric-Workspace-Prod-01", value: "fabric1" },
        { id: 2, label: "Fabric-Workspace-Prod-02", value: "fabric2" },
        { id: 3, label: "Fabric-Workspace-Dev-01", value: "fabric3" },
        { id: 4, label: "Fabric-Workspace-UAT", value: "fabric4" },
        { id: 5, label: "Fabric-Workspace-DR", value: "fabric5" },
    ];


    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                <TextField
                                    label="Tenant ID"
                                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                    size="small"
                                    fullWidth
                                    value={formData.tenantId}
                                    onChange={(e) => handleChange("tenantId", e.target.value)}
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            fontSize: "13px",   // 👈 change here
                                            padding: "10px 12px",
                                        },
                                        // "& .MuiInputLabel-root": {
                                        //     fontSize: "12px",   // 👈 label size
                                        // },
                                    }}
                                    InputProps={{
                                        startAdornment: <LockIcon sx={{ mr: 1, fontSize: 16 }} />
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                                <TextField
                                    label="Client ID"
                                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                    size="small"
                                    fullWidth
                                    value={formData.clientId}
                                    onChange={(e) => handleChange("clientId", e.target.value)}
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            fontSize: "13px",   // 👈 change here
                                            padding: "10px 12px",
                                        },
                                        // "& .MuiInputLabel-root": {
                                        //     fontSize: "12px",   // 👈 label size
                                        // },
                                    }}
                                    InputProps={{
                                        startAdornment: <CloudIcon sx={{ mr: 1, fontSize: 16 }} />
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            label="Client Secret"
                            type="password"
                            size="small"
                            fullWidth
                            value={formData.clientSecret}
                            onChange={(e) => handleChange("clientSecret", e.target.value)}
                            InputProps={{ startAdornment: <KeyIcon sx={{ mr: 1, fontSize: 16 }} /> }}
                        />

                        <TextField
                            select
                            label="Azure Subscription"
                            fullWidth
                            size="small"
                            value={formData.subscription}
                            onChange={(e) =>
                                handleChange("subscription", e.target.value)
                            }
                            sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: "13px",      // selected value text
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: "13px",      // label text
                                },
                            }}
                        >
                            <MenuItem sx={{ fontSize: "13px" }} value="sub1">Subscription 1</MenuItem>
                            <MenuItem sx={{ fontSize: "13px" }} value="sub2">Subscription 2</MenuItem>
                        </TextField>

                        <Box
                            sx={{
                                p: 2,
                                background: "#eff6ff",
                                display: "flex",
                                gap: 1.5,
                                border: "1px solid rgba(46,125,247,0.25)",
                                borderRadius: 3,
                                alignItems: "center",
                            }}
                        >
                            <InfoOutlinedIcon sx={{ fontSize: "17px" }} color="primary" />
                            <Typography fontSize={"12px"} variant="body2" color="text.secondary">
                                Credentials are encrypted in transit. Ensure your service
                                principal has <b>Contributor</b> access on the subscription.
                            </Typography>
                        </Box>
                    </>
                );

            case 1:
                return (
                    <>
                        <Box>
                            <Typography sx={{ fontSize: 11, fontWeight: 600, mb: 0.5, color: "#4a6080" }}>
                                • AZURE DATA FACTORY
                            </Typography>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                size="small"
                                options={azureDataFactoryOptions}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        height: 40,               // reduce overall height
                                        fontSize: "13px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "6px 8px",
                                        fontSize: "13px",
                                    },
                                    "& .MuiFormLabel-root": {
                                        fontSize: "13px",
                                    },
                                    "& .MuiAutocomplete-option": {
                                        fontSize: "13px",
                                        minHeight: "32px",        // compact dropdown items
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderRadius: "6px",      // subtle professional rounded corner
                                    },
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Select Azure Data Factory"
                                        placeholder="Select Azure Data Factory..."
                                        InputLabelProps={{
                                            sx: { fontSize: "13px" },
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <CheckBoxDropdown />

                        <Box>
                            <Typography sx={{ fontSize: 11, fontWeight: 600, mb: 0.5, color: "#4a6080" }}>
                                • FABRIC WORKSPACE
                            </Typography>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                size="small"
                                options={fabricWorkspacesOptions}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        height: 40,               // reduce overall height
                                        fontSize: "13px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "6px 8px",
                                        fontSize: "13px",
                                    },
                                    "& .MuiFormLabel-root": {
                                        fontSize: "13px",
                                    },
                                    "& .MuiAutocomplete-option": {
                                        fontSize: "13px",
                                        minHeight: "32px",        // compact dropdown items
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderRadius: "6px",      // subtle professional rounded corner
                                    },
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Select Azure Data Factory"
                                        placeholder="Select Fabric Workspace..."
                                        InputLabelProps={{
                                            sx: { fontSize: "13px" },
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 11, fontWeight: 600, mb: 0.5, color: "#4a6080" }}>
                                • UPLOAD CONFIG FILE
                            </Typography>
                            <DragDropUpload />
                        </Box>
                        <Box
                            sx={{
                                p: 2,
                                background: "#eff6ff",
                                display: "flex",
                                gap: 1.5,
                                border: "1px solid rgba(46,125,247,0.25)",
                                borderRadius: 3,
                                alignItems: "center",
                            }}
                        >
                            <InfoOutlinedIcon sx={{ fontSize: "17px" }} color="primary" />
                            <Typography fontSize={"12px"} variant="body2" color="text.secondary">
                                Migration is irreversible. Greyed-out pipelines are already migrated and will be skipped automatically
                            </Typography>
                        </Box>
                    </>
                );

            case 2:
                return (
                    <>
                        <Box>
                            <div className="proc-card">
                                <div className="proc-hero">
                                    <div className="proc-orbit-ring"></div>
                                    <div className="proc-orbit-ring"></div>
                                    <div className="proc-orbit-ring"></div>
                                    <div className="proc-icon-wrap">
                                        <div className="proc-ripple"></div>
                                        <div className="proc-ripple"></div>
                                        <div className="proc-icon-circle" id="procIconCircle">
                                            <svg id="procIconSpin" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                                        </div>
                                    </div>
                                    <div className="proc-title" id="procTitle">Migration in Progress</div>
                                    <div className="proc-subtitle" id="procSubtitle">Please do not close this window</div>
                                </div>
                            </div>
                        </Box>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
            }}
        >
            {/* Top Navbar */}
            <AppBar
                position="fixed"
                sx={{ background: "#1a2639", paddingX: 2, top: 0, left: 0, right: 0 }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "48px !important", }}>
                    <div className="logo">
                        <div className="logo-icon"><svg viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                        <span className="logo-text">Fabric<span>Shift</span></span>
                    </div>
                    <Box
                        sx={{
                            background: "#1e40af",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            paddingTop: "3px",
                            paddingBottom: "3px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        DHS
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Center Content */}
            <Container sx={{ mt: 6, width: "58vw" }}>
                <Box textAlign="center" mb={2.5} paddingTop={2}>
                    <Typography
                        variant="overline"
                        sx={{
                            background: "rgba(46,125,247,0.1)",
                            border: "1px solid rgba(46,125,247,0.25)",
                            color: "#1e5bb5",
                            fontSize: 11,
                            px: 2,
                            py: 0.8,
                            borderRadius: 5,
                            fontWeight: 600,
                        }}
                    >
                        ★ MIGRATION WIZARD
                    </Typography>

                    <Typography mt={0.5}
                        sx={{
                            fontSize: 28,
                            fontWeight: 800,
                            fontFamily: "'Sora', sans-serif",
                            letterSpacing: "0.01em",
                            color: "#0a1628",

                        }}>
                        Azure ADF <span style={{ color: "#2563eb" }}>Pipeline Migration</span>
                    </Typography>

                    <Typography color="text.secondary" fontSize={13}>
                        Configure Azure credentials and select pipelines to migrate
                    </Typography>
                </Box>

                <Box sx={{ marginLeft: 6, marginRight: 6 }}>
                    <Stepper
                        sx={{
                            mb: 2.3,
                            "& .MuiStepConnector-line": {
                                borderColor: "#c3c5c5",
                                borderTopWidth: 3, /* line width */
                            },
                        }}
                        nonLinear
                        activeStep={activeStep}>
                        {steps?.map((item, index) => (
                            <Step key={item?.title} completed={activeStep > index}>
                                <StepLabel StepIconComponent={CustomStepIcon}>
                                    <Box textAlign="left" ml={0.8}>
                                        <Typography
                                            sx={{
                                                fontSize: 11,
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontWeight: 600,
                                                lineHeight: 1,
                                                color:
                                                    activeStep === index
                                                        ? "#2f6fd6"
                                                        : "#64748b",
                                            }}
                                        >
                                            {item.step}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontWeight: 700,
                                                color:
                                                    activeStep === index
                                                        ? "#1e293b"
                                                        : "#64748b",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Main Card */}
                <Card
                    sx={{
                        borderRadius: 5,
                        overflow: "hidden",
                        boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                    }}
                >
                    {/* Card Header */}
                    <Box
                        sx={{
                            background: "linear-gradient(90deg,#0f172a,#1e3a8a)",
                            color: "white",
                            pt: 1.5,
                            pb: 1.5,
                            pl: 4,
                            pr: 4,

                        }}
                    >
                        <Typography color="rgba(200, 223, 254, 0.7)" lineHeight={0} fontSize={10} variant="overline">
                            {steps[activeStep]?.step} OF 3
                        </Typography>
                        <Typography fontSize={18} fontWeight="bold">
                            {steps[activeStep]?.summary}
                        </Typography>
                    </Box>

                    <CardContent sx={{ p: 4 }}>
                        <Box display="grid" gap={2}>

                            {getStepContent()}

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <svg width="30" height="30" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0" y="0" width="10" height="10" fill="#F25022" />
                                        <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
                                        <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
                                        <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
                                    </svg>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Typography sx={{ fontFamily: "'Sora',sans-serif", fontSize: "12px", fontWeight: 700, color: "#0a1628", letterSpacing: "0.01em", lineHeight: "18px" }}>Microsoft</Typography>
                                        <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10.5px", fontWeight: 500, color: "#4a6080", lineHeight: "11px" }}>Solutions Partner</Typography>
                                        <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "#6a85a0" }}>Data &amp; AI · Azure</Typography>
                                    </Box>
                                </Box>

                                {/* Buttons */}
                                <Box display="flex" gap={2}>
                                    <button className="btn-secondary" onClick={handleBack}>
                                        {activeStep > 0 ? "Back" : "Clear Form"}
                                    </button>

                                    <button className="btn-primary" onClick={handleCreate}>
                                        {activeStep === 1 ? "Start Migration" : "Continue"} <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </button>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Typography
                    textAlign="center"
                    mt={4}
                    fontSize={12}
                    color="text.secondary"
                >
                    © 2025 Azure Migration Tool · Secured with TLS 1.3 · All credentials encrypted
                </Typography>
            </Container>
        </Box>
    );
};

export default AzureMigration;