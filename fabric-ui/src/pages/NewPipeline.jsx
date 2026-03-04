import {
  TextField,
  Button,
  Paper,
  Box,
  Typography
} from "@mui/material";

const NewPipeline = () => {
  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h6">New Pipeline</Typography>

      <TextField fullWidth label="Pipeline Name" sx={{ my: 2 }} />
      <TextField fullWidth label="Frequency" sx={{ my: 2 }} />
      <TextField fullWidth label="Start Time" sx={{ my: 2 }} />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        sx={{ my: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained">Create</Button>
        <Button variant="outlined">Cancel</Button>
      </Box>
    </Paper>
  );
};

export default NewPipeline;