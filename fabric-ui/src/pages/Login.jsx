import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    login({ name: "Admin User", token: "123456" });
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ p: 4, width: 300 }}>
        <Typography variant="h6">Login</Typography>
        <TextField
          fullWidth
          label="Email"
          sx={{ my: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;