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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CampaignIcon from '@mui/icons-material/Campaign';
import { getAnnouncements } from '../services/dashboardService';

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

const AnnouncementsView = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await getAnnouncements();
        if (res.success) {
          setAnnouncements(res.data);
        } else {
          setError(res.message || 'Failed to fetch announcements');
        }
      } catch (err) {
        setError(err.message || 'Error loading announcements');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
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
          University Announcements & Bulletins
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Stay updated with official academic circulars, event updates, and department news.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={2.5}>
        {announcements.map((item) => (
          <Grid item xs={12} md={6} key={item._id}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.15s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>
                    {item.title}
                  </Typography>
                  {getPriorityChip(item.priority)}
                </Box>
                <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                  {item.content}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #f1f5f9' }}>
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
                    label={`Audience: ${item.targetAudience}`}
                    size="small"
                    sx={{ fontSize: '0.7rem', height: 22, textTransform: 'capitalize' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AnnouncementsView;
