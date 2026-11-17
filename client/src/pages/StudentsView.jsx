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
import PeopleIcon from '@mui/icons-material/People';
import api from '../services/api';

const StudentsView = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/students');
        if (res.data.success) {
          setStudents(res.data.data);
        } else {
          setError(res.data.message || 'Failed to fetch students');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error loading students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
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
          Student Directory & Rosters
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Registered students enrolled across university academic programs.
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
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Student</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Student ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Program</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Semester</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((stu) => (
                <TableRow key={stu._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#1e40af', fontSize: '0.8rem' }}>
                        {stu.user?.name ? stu.user.name.charAt(0) : 'S'}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {stu.user?.name || 'Alex Johnson'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {stu.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#334155' }}>
                    {stu.studentId}
                  </TableCell>
                  <TableCell sx={{ color: '#64748b' }}>
                    {stu.department?.name || 'Computer Science'}
                  </TableCell>
                  <TableCell>{stu.program}</TableCell>
                  <TableCell>Semester {stu.semester}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${stu.attendancePercentage}%`}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        bgcolor: stu.attendancePercentage >= 75 ? '#dcfce7' : '#fee2e2',
                        color: stu.attendancePercentage >= 75 ? '#15803d' : '#b91c1c',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default StudentsView;
