import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import CoursesView from '../pages/CoursesView';
import AnnouncementsView from '../pages/AnnouncementsView';
import DepartmentsView from '../pages/DepartmentsView';
import StudentsView from '../pages/StudentsView';
import FacultyView from '../pages/FacultyView';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected dashboard routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<CoursesView />} />
          <Route path="announcements" element={<AnnouncementsView />} />
          <Route path="departments" element={<DepartmentsView />} />
          <Route path="students" element={<StudentsView />} />
          <Route path="faculty" element={<FacultyView />} />
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
