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
  Avatar,
  Divider,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DomainIcon from '@mui/icons-material/Domain';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getAdminDashboardData } from '../../services/dashboardService';

const getPriorityChip = (priority) => {
  switch (priority) {
    case 'high':
    case 'urgent':
      return <Chip label="High" size="small" color="error" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
    case 'medium':
      return <Chip label="Medium" size="small" color="warning" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
    default:
      return <Chip label="General" size="small" color="default" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
  }
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getAdminDashboardData();
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || 'Failed to load admin dashboard');
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
        <CircularProgress sx={{ color: '#b91c1c' }} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>;
  }

  const { stats, recentApplications, recentAnnouncements, adminName } = data;

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      color: '#2563eb',
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe',
      sub: 'Enrolled students',
    },
    {
      title: 'Total Faculty',
      value: stats.totalFaculty,
      icon: <AssignmentIndIcon sx={{ fontSize: 28 }} />,
      color: '#4f46e5',
      bgColor: '#eef2ff',
      borderColor: '#c7d2fe',
      sub: 'Academic professors',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: <MenuBookIcon sx={{ fontSize: 28 }} />,
      color: '#059669',
      bgColor: '#ecfdf5',
      borderColor: '#a7f3d0',
      sub: 'Active catalog subjects',
    },
    {
      title: 'Total Departments',
      value: stats.totalDepartments,
      icon: <DomainIcon sx={{ fontSize: 28 }} />,
      color: '#d97706',
      bgColor: '#fffbeb',
      borderColor: '#fde68a',
      sub: 'University faculties',
    },
  ];

  return (
    <Box>
      {/* Welcome Banner */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #881337 0%, #be123c 100%)',
          color: '#ffffff',
          p: { xs: 2.5, sm: 3.5 },
          boxShadow: '0 10px 25px -5px rgba(190, 18, 60, 0.25)',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Welcome, {adminName || 'Administrator'}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600 }}>
              Central administrative control panel for university metrics, academic records, and campus communications.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Chip
              label="System Administrator"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                py: 2,
                px: 1,
              }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* 4 Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.15s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5, mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {stat.sub}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    bgcolor: stat.bgColor,
                    color: stat.color,
                    border: `1px solid ${stat.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Student Registrations / Applications */}
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
              <PersonAddAlt1Icon sx={{ color: '#be123c' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Recent Student Applications & Registrations
              </Typography>
            </Box>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Student</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Student ID</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentApplications && recentApplications.length > 0 ? (
                    recentApplications.map((student) => (
                      <TableRow key={student._id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#be123c', fontSize: '0.8rem' }}>
                              {student.user?.name ? student.user.name.charAt(0) : 'S'}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                {student.user?.name || 'Student Name'}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
                                {student.user?.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#334155' }}>
                          {student.studentId}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b' }}>
                          {student.department?.name || 'General Engineering'}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={student.user?.status || 'Active'}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              bgcolor: '#ecfdf5',
                              color: '#047857',
                              textTransform: 'capitalize',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, color: '#94a3b8' }}>
                        No student applications found.
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
              <CampaignIcon sx={{ color: '#be123c' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Recent System Announcements
              </Typography>
            </Box>
            <CardContent sx={{ p: 2.5 }}>
              {recentAnnouncements && recentAnnouncements.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentAnnouncements.map((item) => (
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        <Chip
                          label={`Target: ${item.targetAudience}`}
                          size="small"
                          sx={{ fontSize: '0.68rem', height: 20, textTransform: 'capitalize' }}
                        />
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

export default AdminDashboard;
