import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, icon }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {icon}
          <Box>
            <Typography color="text.secondary">{title}</Typography>
            <Typography variant="h5">{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;