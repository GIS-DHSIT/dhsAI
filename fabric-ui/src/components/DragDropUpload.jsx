import React, { useState, useCallback } from "react";
import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = [".json", ".yaml", ".xml"];

export default function DragDropUpload() {
    const [files, setFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);

    /* ---------------- File Validation ---------------- */

    const validateFiles = (selectedFiles) => {
        const validFiles = [];

        Array.from(selectedFiles).forEach((file) => {
            const fileExtension = "." + file.name.split(".").pop().toLowerCase();

            if (!ALLOWED_TYPES.includes(fileExtension)) {
                alert(`${file.name} is not a supported file type.`);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                alert(`${file.name} exceeds 50MB limit.`);
                return;
            }

            validFiles.push(file);
        });

        setFiles((prev) => [...prev, ...validFiles]);
    };

    /* ---------------- Drag Events ---------------- */

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        validateFiles(e.dataTransfer.files);
    };

    /* ---------------- Remove File ---------------- */

    const handleRemove = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* ---------------- Upload Area ---------------- */}

            <Paper
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                variant="outlined"
                sx={{
                    borderRadius: "20px",
                    p: 2,
                    textAlign: "center",
                    borderStyle: "dashed",
                    borderColor: dragActive ? "#2f6fd6" : "#9bb7df",
                    backgroundColor: dragActive ? "#eef4ff" : "#f8fbff",
                    transition: "0.3s",
                    cursor: "pointer",
                }}
            >
                <CloudUploadIcon
                    sx={{
                        fontSize: 40,
                        color: "#2f6fd6",
                    }}
                />

                <Typography fontSize={16} fontWeight={600}>
                    Drop files or click to browse
                </Typography>

                <Typography
                    fontSize={11}
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Supports .json, .yaml, .xml · Max 50MB
                </Typography>

                {/* Hidden Input */}
                <input
                    type="file"
                    multiple
                    accept=".json,.yaml,.xml"
                    style={{ display: "none" }}
                    id="upload-file"
                    onChange={(e) => validateFiles(e.target.files)}
                />

                <label htmlFor="upload-file">
                    <Button
                        variant="outlined"
                        size="small"
                        component="span"
                        sx={{
                            borderRadius: "12px",
                            px: 3,
                            fontSize: 11,
                        }}
                    >
                        Choose Files
                    </Button>
                </label>
            </Paper>

            {/* ---------------- File Preview List ---------------- */}

            {files.length > 0 && (
                <List sx={{ mt: 0, paddingBottom: 0 }}>
                    {files.map((file, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                backgroundColor: "#2e7df70f",
                                borderRadius: "12px",
                                mb: 1,
                                paddingY: 0.3,
                                paddingX: 2,
                            }}
                        >
                            {/* <IconButton sx={{ background: "red" }}> */}
                            <Box sx={{ mr: 2, background: "linear-gradient(135deg, #1e5bb5, #2e7df7)", borderRadius: "8px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <InsertDriveFileIcon sx={{ fontSize: 16, color: "#ffffff" }} />
                            </Box>
                            {/* </IconButton> */}
                            <ListItemText
                                primary={file.name}
                                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                primaryTypographyProps={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                                secondaryTypographyProps={{
                                    fontSize: 10,

                                }}
                            />

                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    onClick={() => handleRemove(index)}
                                >
                                    <CloseIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}