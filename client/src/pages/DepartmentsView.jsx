import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import PersonIcon from '@mui/icons-material/Person';
import { getDepartments } from '../services/authService';

const DepartmentsView = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await getDepartments();
        if (res.success) {
          setDepartments(res.data);
        } else {
          setError(res.message || 'Failed to fetch departments');
        }
      } catch (err) {
        setError(err.message || 'Error loading departments');
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
          University Departments
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Faculties and academic divisions administering undergraduate and postgraduate curricula.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid item xs={12} md={6} key={dept._id}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: '#fffbeb',
                        color: '#d97706',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <DomainIcon />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      {dept.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={dept.code}
                    size="small"
                    sx={{ fontWeight: 700, bgcolor: '#fef3c7', color: '#92400e' }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: '#475569', mb: 2, minHeight: 40 }}>
                  {dept.description || 'Department offering comprehensive degree programs.'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 1.5, borderTop: '1px solid #f1f5f9' }}>
                  <PersonIcon sx={{ fontSize: 18, color: '#64748b' }} />
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    Head of Department: {dept.headOfDepartment || 'Assigned Professor'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DepartmentsView;
