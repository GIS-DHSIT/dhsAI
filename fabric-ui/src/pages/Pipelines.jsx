import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Pipelines = () => {
  const navigate = useNavigate();

  const data = [
    { name: "ETL Pipeline", status: "Active" },
    { name: "Data Cleanup", status: "Paused" }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <h2>Pipelines</h2>
        <Button variant="contained" onClick={() => navigate("/pipelines/new")}>
          New Pipeline
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Pipelines;