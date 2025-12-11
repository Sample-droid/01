import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";import { useAuth } from "../Context/AuthContext";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(credentials.username, credentials.password);

    if (result.success) {
      navigate("/home");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            value={credentials.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link component={RouterLink} to="/signup" underline="hover">
            Signup
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;