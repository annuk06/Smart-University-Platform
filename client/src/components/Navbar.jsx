import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const getRoleBadgeColor = (role) => {
  switch (role) {
    case 'admin':
      return { bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5' };
    case 'faculty':
      return { bg: '#e0e7ff', color: '#4338ca', border: '#a5b4fc' };
    case 'student':
      return { bg: '#dcfce7', color: '#15803d', border: '#86efac' };
    default:
      return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
  }
};

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
    navigate('/login');
  };

  const roleStyle = getRoleBadgeColor(user?.role);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        color: '#1e293b',
        borderBottom: '1px solid #e2e8f0',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Left: Menu toggle + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard')}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(30, 64, 175, 0.25)',
              }}
            >
              <SchoolIcon fontSize="small" />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.15rem' },
                  letterSpacing: '-0.02em',
                  color: '#0f172a',
                  lineHeight: 1.2,
                }}
              >
                Smart University
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748b',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Academic Management Portal
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right: User Role & Profile */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
              label={user.role ? user.role.toUpperCase() : 'USER'}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: '0.7rem',
                backgroundColor: roleStyle.bg,
                color: roleStyle.color,
                border: `1px solid ${roleStyle.border}`,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            />

            <Box
              onClick={handleOpenMenu}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                p: 0.5,
                borderRadius: 2,
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: '#1e40af',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>

              <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  {user.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Account Role" secondary={user.role} />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: '#dc2626' }}>
                <ListItemIcon sx={{ color: '#dc2626' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
