import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    Checkbox,
    Chip,
    Popper,
    Paper,
    InputAdornment,
    ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const pipelineData = [
    { name: "Pipeline_Prod_ETL", disabled: false },
    { name: "Pipeline_Staging_Load", disabled: false },
    { name: "Pipeline_Legacy_v1", disabled: true, migrated: true },
    { name: "Pipeline_Finance_Daily", disabled: false },
    { name: "Pipeline_HR_Sync", disabled: true, migrated: true },
    { name: "Pipeline_Analytics_Export", disabled: false },
];

export default function AdfPipelines({ handleChange }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState("");

    const handleToggle = (name) => {
        if (selected.includes(name)) {
            setSelected(selected.filter((s) => s !== name));
        } else {
            setSelected([...selected, name]);
        }
    };

    const filtered = pipelineData.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, mb: 0.5, color: "#4a6080" }}>
                • ADF PIPELINES
            </Typography>

            {/* Select Box */}
            <TextField
                fullWidth
                size="small"
                placeholder="Select pipelines..."
                onClick={() => setOpen(true)}
                InputProps={{
                    readOnly: true,
                    // inputComponent: () => null
                    startAdornment: selected.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                gap: 0.8,
                                flexWrap: "wrap",
                                alignItems: "center",
                                minHeight: "40px",
                                maxHeight: "52px",
                                overflowY: "auto",
                                py: "2px",
                                width: "100%",
                            }}
                        >
                            {selected.map((name) => (
                                <Chip
                                    key={name}
                                    label={name}
                                    size="small"
                                    onDelete={(e) => {
                                        e.stopPropagation();
                                        setSelected((prev) =>
                                            prev.filter((s) => s !== name)
                                        );
                                    }}
                                    sx={{
                                        borderRadius: "12px",
                                        backgroundColor: "#E3F2FD",
                                        color: "#1976D2",
                                        fontSize: 12,
                                        height: 26,
                                    }}
                                />
                            ))}
                        </Box>
                    ),
                    endAdornment: <KeyboardArrowDownIcon />,
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                        minHeight: 40,
                        fontSize: 14,
                        paddingY: "6px",
                        paddingX: "12px",
                        alignItems: "flex-start",
                    },
                    "& .MuiInputBase-input": {
                        width: selected.length ? 0 : "100%",  // 👈 show placeholder only when empty
                        minWidth: 0,
                        padding: 0,
                    },
                }}
            />

            {/* Dropdown */}
            {open && (
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <Paper
                        elevation={3}
                        sx={{
                            mt: 1,
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Search */}
                        <Box sx={{ p: 1.5 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search pipelines..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="inherit" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        height: 38,
                                        fontSize: 14,
                                    },
                                }}
                            />
                        </Box>

                        {/* List */}
                        <Box sx={{ maxHeight: 250, overflowY: "auto", px: 1.5 }}>
                            {filtered.map((item) => (
                                <Box
                                    key={item.name}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        py: 0,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Checkbox
                                            size="small"
                                            disabled={item.disabled}
                                            checked={selected.includes(item.name)}
                                            onChange={() => {
                                                handleToggle(item.name)
                                                handleChange("pipelines",[...selected, item.name])
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                textDecoration: item.disabled ? "line-through" : "none",
                                                color: item.disabled ? "gray" : "inherit",
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>

                                    {item.migrated && (
                                        <Chip
                                            label="Migrated"
                                            size="small"
                                            sx={{
                                                backgroundColor: "#E3F2FD",
                                                color: "#1976D2",
                                                fontSize: 12,
                                                height: 24,
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {/* Footer */}
                        <Box
                            sx={{
                                borderTop: "1px solid #eee",
                                px: 2,
                                py: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 13,
                            }}
                        >
                            <Typography sx={{ color: "#9c9999", fontSize: 12 }}>{selected.length} selected</Typography>
                            <Typography
                                sx={{ color: "#1976D2", cursor: "pointer", fontSize: 12 }}
                                onClick={() => setSelected([])}
                            >
                                Clear all
                            </Typography>
                        </Box>
                    </Paper>
                </ClickAwayListener>
            )}
        </Box>
    );
}