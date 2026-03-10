import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material';

export interface DatePickerProps extends Partial<MuiDatePickerProps<any>> {
  label: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  fullWidth?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value = null,
  onChange,
  fullWidth = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth,
            variant: 'outlined',
            sx: {
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                transition: 'all 0.2s',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.primary.main,
              },
              backgroundColor: '#fff',
            },
          },
          layout: {
            sx: {
              '.MuiPickersDay-root.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
              '.MuiPickersDay-today': {
                borderColor: theme.palette.primary.main,
              },
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            }
          }
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};
