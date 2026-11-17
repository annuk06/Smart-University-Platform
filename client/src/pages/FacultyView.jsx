import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import api from '../services/api';

const FacultyView = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get('/faculty');
        if (res.data.success) {
          setFacultyList(res.data.data);
        } else {
          setError(res.data.message || 'Failed to fetch faculty list');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error loading faculty');
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
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
          Faculty Directory
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Academic staff and research instructors across university departments.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}
      >
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Faculty Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Faculty ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Designation</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Specialization</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Office</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facultyList.map((fac) => (
                <TableRow key={fac._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#4338ca', fontSize: '0.8rem' }}>
                        {fac.user?.name ? fac.user.name.charAt(0) : 'F'}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {fac.user?.name || 'Faculty Name'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {fac.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#334155' }}>
                    {fac.facultyId}
                  </TableCell>
                  <TableCell sx={{ color: '#64748b' }}>
                    {fac.department?.name || 'Computer Science'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={fac.designation || 'Professor'}
                      size="small"
                      sx={{ fontWeight: 600, bgcolor: '#e0e7ff', color: '#4338ca' }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{fac.specialization || 'General'}</TableCell>
                  <TableCell sx={{ color: '#64748b' }}>{fac.officeLocation || 'Main Block'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default FacultyView;
