import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const baseurl =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const validate = () => {
    const errs = {};

    if (!form.username.trim()) errs.username = 'Username is required';

    // Optional: enable email validation if you want
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Email is invalid';

    if (form.password.length < 5)
      errs.password = 'Minimum 5 characters required';

    if (form.password !== form.confirm)
      errs.confirm = 'Passwords do not match';

    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null, submit: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password
      };

      const res = await axios.post(
        
        `${baseurl}/api/auth/signup`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );

      if (res.status >= 200 && res.status < 300) {
        navigate('/login');
      } else {
        setErrors({
          submit: res.data?.message || 'Signup failed'
        });
      }
    } catch (err) {
      if (err.response) {
        setErrors({
          submit:
            err.response.data?.message ||
            `Error: ${err.response.status}`
        });
      } else if (err.request) {
        setErrors({
          submit: 'No response from server. Try again later.'
        });
      } else {
        setErrors({ submit: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Box p={4}>
          <Typography variant="h4" align="center">
            Create Account
          </Typography>

          <Box component="form" mt={2} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={form.username}
              onChange={handleChange}
              margin="normal"
              error={!!errors.username}
              helperText={errors.username}
            />

            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              fullWidth
              name="confirm"
              label="Confirm Password"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              margin="normal"
              error={!!errors.confirm}
              helperText={errors.confirm}
            />

            {errors.submit && (
              <Typography
                color="error"
                variant="body2"
                align="center"
                mt={1}
              >
                {errors.submit}
              </Typography>
            )}

            <Box mt={3} position="relative">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                Sign Up
              </Button>

              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px'
                  }}
                />
              )}
            </Box>

            <Typography variant="body2" align="center" mt={2}>
              Already have an account?{' '}
              <RouterLink to="/login">Login</RouterLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
export default Signup;