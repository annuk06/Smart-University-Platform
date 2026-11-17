import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDepartments } from '../services/authService';

const programs = [
  'Bachelor of Technology (B.Tech)',
  'Bachelor of Science (B.Sc)',
  'Bachelor of Business Administration (BBA)',
  'Master of Technology (M.Tech)',
  'Master of Business Administration (MBA)',
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    departmentId: '',
    program: 'Bachelor of Technology (B.Tech)',
    semester: 1,
  });

  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await getDepartments();
        if (res.success && res.data) {
          setDepartments(res.data);
          if (res.data.length > 0) {
            setFormData((prev) => ({ ...prev, departmentId: res.data[0]._id }));
          }
        }
      } catch (err) {
        console.error('Failed to load departments:', err);
      }
    };
    fetchDepts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      departmentId: formData.departmentId,
      program: formData.program,
      semester: Number(formData.semester),
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.message);
    }
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
        py: 4,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 540,
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
            p: 3.5,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
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
            <SchoolIcon sx={{ fontSize: 30 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Student Registration
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Create your university student account
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="name"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="University Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student.name@university.edu"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  name="password"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Academic Department"
                  name="departmentId"
                  fullWidth
                  value={formData.departmentId}
                  onChange={handleChange}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept._id} value={dept._id}>
                      {dept.name} ({dept.code})
                    </MenuItem>
                  ))}
                  {departments.length === 0 && (
                    <MenuItem value="">Computer Science & Engineering</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Semester"
                  name="semester"
                  fullWidth
                  value={formData.semester}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <MenuItem key={sem} value={sem}>
                      Semester {sem}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  label="Degree Program"
                  name="program"
                  fullWidth
                  value={formData.program}
                  onChange={handleChange}
                >
                  {programs.map((prog) => (
                    <MenuItem key={prog} value={prog}>
                      {prog}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'none',
                bgcolor: '#1d4ed8',
                '&:hover': { bgcolor: '#1e40af' },
              }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Complete Registration'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Already registered?{' '}
              <Typography
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#2563eb',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign In
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
