import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Divider,
  Button,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getStudentDashboardData } from '../../services/dashboardService';

const getPriorityChip = (priority) => {
  switch (priority) {
    case 'high':
    case 'urgent':
      return <Chip label="High Priority" size="small" color="error" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
    case 'medium':
      return <Chip label="Medium" size="small" color="warning" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
    default:
      return <Chip label="General" size="small" color="default" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
  }
};

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getStudentDashboardData();
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error loading dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#1d4ed8' }} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>;
  }

  return (
    <Box>
      {/* Welcome Banner */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: '#ffffff',
          p: { xs: 2.5, sm: 3.5 },
          boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              {data.welcomeMessage}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600 }}>
              Here is an overview of your academic performance, enrolled subjects, and university notices.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(6px)',
                px: 2.5,
                py: 1.5,
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="caption" sx={{ display: 'block', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Student ID
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>
                {data.studentId}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Profile & Academic Details Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Student Details Card */}
        <Grid item xs={12} sm={6} lg={4}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AccountCircleIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                    Student Information
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    {data.studentName}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>Department:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{data.department}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>Program:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', textAlign: 'right' }}>{data.program}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>Semester:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>Semester {data.semester}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Percentage Card */}
        <Grid item xs={12} sm={6} lg={4}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: '#f0fdf4',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircleOutlineIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                    Overall Attendance
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#15803d' }}>
                    {data.attendancePercentage}%
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={data.attendancePercentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: data.attendancePercentage >= 75 ? '#16a34a' : '#ea580c',
                      borderRadius: 5,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 1 }}>
                  Requirement: Minimum 75% for exam qualification.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Courses Card */}
        <Grid item xs={12} sm={12} lg={4}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: '#faf5ff',
                    color: '#9333ea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MenuBookIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                    Enrolled Courses
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#7e22ce' }}>
                    {data.currentCourses?.length || 0} Subjects
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
                All registered subjects for the current semester are active and up-to-date.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Current Courses Table */}
        <Grid item xs={12} lg={7}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ p: 2.5, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1 }}>
              <MenuBookIcon sx={{ color: '#2563eb' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Current Courses
              </Typography>
            </Box>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Course Code</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Course Title</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Credits</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Faculty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.currentCourses && data.currentCourses.length > 0 ? (
                    data.currentCourses.map((course) => (
                      <TableRow key={course._id || course.code} hover>
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
                        <TableCell>{course.credits} Credits</TableCell>
                        <TableCell sx={{ color: '#64748b' }}>
                          {course.faculty?.user?.name || 'Assigned Professor'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, color: '#94a3b8' }}>
                        No enrolled courses found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Recent Announcements */}
        <Grid item xs={12} lg={5}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ p: 2.5, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1 }}>
              <CampaignIcon sx={{ color: '#2563eb' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Recent Announcements
              </Typography>
            </Box>
            <CardContent sx={{ p: 2.5 }}>
              {data.recentAnnouncements && data.recentAnnouncements.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {data.recentAnnouncements.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        transition: 'transform 0.15s ease',
                        '&:hover': { transform: 'translateY(-2px)' },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                          {item.title}
                        </Typography>
                        {getPriorityChip(item.priority)}
                      </Box>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 1.2, fontSize: '0.85rem' }}>
                        {item.content}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94a3b8' }}>
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        <Typography variant="caption">
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 3 }}>
                  No recent announcements.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
