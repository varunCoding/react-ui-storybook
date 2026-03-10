import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type { DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';
import { Paper, useTheme } from '@mui/material';

export interface CalendarProps extends Partial<DateCalendarProps> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  disablePast?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  value = null,
  onChange,
  ...props
}) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={0}
        sx={{
          display: 'inline-block',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          '.MuiPickersDay-root.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
          '.MuiPickersDay-today': {
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <DateCalendar 
          value={value} 
          onChange={onChange}
          {...props} 
        />
      </Paper>
    </LocalizationProvider>
  );
};
