import React from 'react';
import { useAuth } from '../context/AuthContext';
import StudentDashboard from './student/StudentDashboard';
import FacultyDashboard from './faculty/FacultyDashboard';
import AdminDashboard from './admin/AdminDashboard';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Role not recognized. Please contact your system administrator.
          </Typography>
        </Box>
      );
  }
};

export default Dashboard;
