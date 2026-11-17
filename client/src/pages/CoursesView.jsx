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
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getCourses } from '../services/dashboardService';

const CoursesView = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        if (res.success) {
          setCourses(res.data);
        } else {
          setError(res.message || 'Failed to fetch courses');
        }
      } catch (err) {
        setError(err.message || 'Error loading courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
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
          Academic Course Catalog
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Comprehensive listing of all curriculum modules, credits, and faculty assignments.
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
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Course Code</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Credits</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Semester</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Instructor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id} hover>
                  <TableCell>
                    <Chip
                      label={course.code}
                      size="small"
                      sx={{ fontWeight: 700, bgcolor: '#eff6ff', color: '#1d4ed8' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {course.title}
                  </TableCell>
                  <TableCell sx={{ color: '#64748b' }}>
                    {course.department?.name || 'Computer Science'}
                  </TableCell>
                  <TableCell>{course.credits} Credits</TableCell>
                  <TableCell>Semester {course.semester || 1}</TableCell>
                  <TableCell sx={{ color: '#334155', fontWeight: 500 }}>
                    {course.faculty?.user?.name || 'Faculty Member'}
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

export default CoursesView;
