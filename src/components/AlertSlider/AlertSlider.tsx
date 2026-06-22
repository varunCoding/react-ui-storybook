import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

export interface AlertSliderProps {
  /** List of alert items to slide through */
  alerts: AlertItem[];
  /** Section title text. Defaults to "Alerts". Pass empty string to hide. */
  title?: string;
  /** Automatically rotate alerts in milliseconds. If undefined, autoplay is disabled. */
  autoPlayDuration?: number;
  sx?: SxProps<Theme>;
  className?: string;
  style?: never;
}

export const AlertSlider: React.FC<AlertSliderProps> = ({
  alerts = [],
  title = 'Alerts',
  autoPlayDuration,
  sx,
  className,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const hasMultipleAlerts = alerts.length > 1;

  // Severity color maps dynamically responding to dark/light theme mode
  const severityStyles = {
    error: {
      bgColor: isDark ? '#2c1517' : '#fff1f2',
      borderColor: isDark ? '#4c1f24' : '#ffe4e6',
      iconColor: '#f43f5e',
      textColor: isDark ? '#fca5a5' : '#9f1239',
      icon: ErrorIcon,
    },
    warning: {
      bgColor: isDark ? '#2a1a0f' : '#fffbeb',
      borderColor: isDark ? '#452209' : '#fef3c7',
      iconColor: '#fb923c',
      textColor: isDark ? '#fdba74' : '#92400e',
      icon: WarningIcon,
    },
    info: {
      bgColor: isDark ? '#0c1d2e' : '#f0f9ff',
      borderColor: isDark ? '#0b2e4f' : '#e0f2fe',
      iconColor: '#38bdf8',
      textColor: isDark ? '#bae6fd' : '#075985',
      icon: InfoIcon,
    },
    success: {
      bgColor: isDark ? '#0d2218' : '#f0fdf4',
      borderColor: isDark ? '#0c3822' : '#dcfce7',
      iconColor: '#4ade80',
      textColor: isDark ? '#bbf7d0' : '#166534',
      icon: CheckCircleIcon,
    },
  };

  const handlePrev = () => {
    if (!hasMultipleAlerts) return;
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    if (!hasMultipleAlerts) return;
    setActiveIndex((prev) => (prev < alerts.length - 1 ? prev + 1 : prev));
  };

  useEffect(() => {
    if (!hasMultipleAlerts || autoPlayDuration === undefined || isPaused) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === alerts.length - 1 ? 0 : prev + 1));
    }, autoPlayDuration);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [hasMultipleAlerts, autoPlayDuration, isPaused, alerts.length]);

  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <Box
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        ...sx,
      }}
    >
      {/* Header Row */}
      {(title || hasMultipleAlerts) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {title && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontSize: '1.25rem',
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {title}
            </Typography>
          )}

          {hasMultipleAlerts && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous alert"
                size="small"
                sx={{
                  border: `1.5px solid ${theme.palette.primary.main}`,
                  color: 'primary.main',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(144, 202, 249, 0.08)' : 'rgba(0, 91, 159, 0.04)',
                  },
                  '&.Mui-disabled': {
                    borderColor: '#8099FF',
                    color: '#8099FF',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                disabled={activeIndex === alerts.length - 1}
                aria-label="Next alert"
                size="small"
                sx={{
                  border: `1.5px solid ${theme.palette.primary.main}`,
                  color: 'primary.main',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(144, 202, 249, 0.08)' : 'rgba(0, 91, 159, 0.04)',
                  },
                  '&.Mui-disabled': {
                    borderColor: '#8099FF',
                    color: '#8099FF',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      )}

      {/* Slider Viewport */}
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: isDark
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {alerts.map((alert) => {
            const severity = alert.severity || 'info';
            const config = severityStyles[severity];
            const SeverityIcon = config.icon;

            return (
              <Box
                key={alert.id}
                sx={{
                  flex: '0 0 100%',
                  width: '100%',
                  boxSizing: 'border-box',
                  backgroundColor: config.bgColor,
                  border: `1.5px solid ${config.borderColor}`,
                  borderRadius: '12px',
                  p: 2.5,
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start',
                }}
              >
                <SeverityIcon
                  sx={{
                    color: config.iconColor,
                    fontSize: '1.5rem',
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: config.textColor,
                      lineHeight: 1.3,
                      mb: 0.75,
                      fontFamily: theme.typography.fontFamily,
                    }}
                  >
                    {alert.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: config.textColor,
                      opacity: 0.9,
                      lineHeight: 1.5,
                      wordBreak: 'break-word',
                      fontFamily: theme.typography.fontFamily,
                    }}
                  >
                    {alert.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
