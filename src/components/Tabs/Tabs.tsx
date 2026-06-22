import React, { useState } from 'react';
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  Box,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactElement;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Array of tabs to display */
  items: TabItem[];
  /** Default active tab ID (uncontrolled mode) */
  defaultValue?: string;
  /** Active tab ID for controlled mode */
  value?: string;
  /** Callback triggered when tab changes */
  onChange?: (id: string) => void;
  /** Tab layout variant: 'standard' | 'scrollable' | 'fullWidth' */
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  /** Orientation of the tabs: 'horizontal' | 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  /** Color theme style of the tabs: 'primary' | 'secondary' */
  color?: 'primary' | 'secondary';
  /** Custom styles for the container */
  sx?: SxProps<Theme>;
  className?: string;
  style?: never;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
  orientation?: 'horizontal' | 'vertical';
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, orientation, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{
        flexGrow: 1,
        width: '100%',
        display: value === index ? 'block' : 'none',
        py: orientation === 'vertical' ? 0 : 3,
        px: orientation === 'vertical' ? 4 : 0,
      }}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: string) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultValue,
  value: controlledValue,
  onChange,
  variant = 'standard',
  orientation = 'horizontal',
  color = 'primary',
  sx,
  className,
}) => {
  const theme = useTheme();
  
  // Local state if uncontrolled
  const initialValue = defaultValue || (items && items.length > 0 ? items[0].id : '');
  const [localValue, setLocalValue] = useState<string>(initialValue);
  
  const isControlled = controlledValue !== undefined;
  const activeTabId = isControlled ? controlledValue : localValue;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (!isControlled) {
      setLocalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  const isVertical = orientation === 'vertical';

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        width: '100%',
        ...sx,
      }}
    >
      <Box
        sx={{
          borderBottom: isVertical ? 0 : 1,
          borderRight: isVertical ? 1 : 0,
          borderColor: 'divider',
          minWidth: isVertical ? 200 : 'auto',
          display: 'flex',
        }}
      >
        <MuiTabs
          value={activeTabId}
          onChange={handleTabChange}
          orientation={orientation}
          variant={variant}
          textColor={color}
          indicatorColor={color}
          aria-label="accessible navigation tabs"
          sx={{
            width: '100%',
            '.MuiTabs-indicator': {
              height: isVertical ? 'auto' : '3px',
              width: isVertical ? '3px' : 'auto',
              borderRadius: '4px',
            },
          }}
        >
          {items.map((item) => (
            <MuiTab
              key={item.id}
              value={item.id}
              label={item.label}
              icon={item.icon}
              iconPosition="start"
              disabled={item.disabled}
              {...a11yProps(item.id)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                minHeight: 48,
                py: 1.5,
                px: 2.5,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: `${color}.main`,
                  fontWeight: 700,
                },
                '&:hover:not(.Mui-disabled)': {
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  opacity: 0.8,
                },
                transition: 'all 0.2s ease',
                justifyContent: isVertical ? 'flex-start' : 'center',
                textAlign: isVertical ? 'left' : 'center',
              }}
            />
          ))}
        </MuiTabs>
      </Box>
      {items.map((item) => (
        <CustomTabPanel
          key={item.id}
          value={activeTabId}
          index={item.id}
          orientation={orientation}
        >
          {item.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
