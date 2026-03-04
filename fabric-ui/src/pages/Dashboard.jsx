import { Box, Typography, Grid, Paper } from "@mui/material";
import StatCard from "../components/StatCard";
import StatusChip from "../components/StatusChip";
import StorageIcon from "@mui/icons-material/Storage";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Active Pipelines"
            value="12"
            icon={<AccountTreeIcon color="primary" fontSize="large" />}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            title="Datasets"
            value="8"
            icon={<StorageIcon color="success" fontSize="large" />}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            title="Running Jobs"
            value="4"
            icon={<PlayArrowIcon color="warning" fontSize="large" />}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Recent Jobs
        </Typography>

        <Paper elevation={2}>
          <Box p={2}>
            <table width="100%">
              <thead>
                <tr>
                  <th align="left">Job Name</th>
                  <th align="left">Status</th>
                  <th align="left">Start Time</th>
                  <th align="left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Ingestion</td>
                  <td><StatusChip status="Success" /></td>
                  <td>Today, 10:15 AM</td>
                  <td>5 mins</td>
                </tr>
                <tr>
                  <td>Data Cleanup</td>
                  <td><StatusChip status="Failed" /></td>
                  <td>Yesterday, 03:45 PM</td>
                  <td>7 mins</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;