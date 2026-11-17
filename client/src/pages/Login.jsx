import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  InputAdornment,
  IconButton,
  Chip,
  Grid,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleQuickDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Demo@1234');
    setErrorMessage('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f1f5f9',
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 460,
          width: '100%',
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
            color: '#ffffff',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1.5,
            }}
          >
            <SchoolIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Smart University Portal
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5, fontWeight: 400 }}>
            Sign in to access your university dashboard
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                py: 1.4,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'none',
                bgcolor: '#1d4ed8',
                '&:hover': { bgcolor: '#1e40af' },
              }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Are you a new student?{' '}
              <Typography
                component={RouterLink}
                to="/register"
                sx={{
                  color: '#2563eb',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Register Here
              </Typography>
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
              ONE-CLICK DEMO LOGIN
            </Typography>
          </Divider>

          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleQuickDemo('admin@demo.edu')}
                startIcon={<AdminPanelSettingsIcon sx={{ fontSize: 16 }} />}
                sx={{
                  py: 0.8,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: '#fca5a5',
                  color: '#b91c1c',
                  bgcolor: '#fef2f2',
                  '&:hover': { bgcolor: '#fee2e2', borderColor: '#f87171' },
                }}
              >
                Admin
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleQuickDemo('faculty@demo.edu')}
                startIcon={<BadgeOutlinedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  py: 0.8,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: '#a5b4fc',
                  color: '#4338ca',
                  bgcolor: '#eef2ff',
                  '&:hover': { bgcolor: '#e0e7ff', borderColor: '#818cf8' },
                }}
              >
                Faculty
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleQuickDemo('student@demo.edu')}
                startIcon={<PersonOutlineIcon sx={{ fontSize: 16 }} />}
                sx={{
                  py: 0.8,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: '#86efac',
                  color: '#15803d',
                  bgcolor: '#f0fdf4',
                  '&:hover': { bgcolor: '#dcfce7', borderColor: '#4ade80' },
                }}
              >
                Student
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
