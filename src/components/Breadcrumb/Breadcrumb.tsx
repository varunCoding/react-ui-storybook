import React from 'react';
import {
  Box,
  Typography,
  Link as MuiLink,
  styled,
  type SxProps,
  type Theme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface BreadcrumbItem {
  /** The text to display for this breadcrumb item */
  label: string;
  /** Optional URL that the link points to */
  href?: string;
  /** Callback fired when the item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Custom component to use for rendering the link (e.g., router link component) */
  component?: React.ElementType;
  /** Any additional props to pass to the underlying link component */
  [key: string]: any;
}

export interface BreadcrumbProps {
  /** The list of breadcrumb items to display, from root to current page */
  items: BreadcrumbItem[];
  /** Custom separator node. Defaults to a subtle ChevronRight icon. */
  separator?: React.ReactNode;
  /** Whether to show a back arrow icon on mobile view. Defaults to true. */
  showMobileBackIcon?: boolean;
  /** Custom MUI style overrides for the wrapper */
  sx?: SxProps<Theme>;
  /** Custom CSS class name */
  className?: string;
}

// Styled link component with premium hover transitions and colors
const BreadcrumbLink = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  textDecorationColor: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: '0.925rem',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  outline: 'none',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecorationColor: theme.palette.primary.dark,
  },
  '&:focus-visible': {
    borderRadius: '4px',
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

// Separator container with micro-animations
const SeparatorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.disabled,
  userSelect: 'none',
  padding: '0 4px',
  fontSize: '0.9rem',
}));

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [],
  separator = <NavigateNextIcon fontSize="small" sx={{ opacity: 0.7 }} />,
  showMobileBackIcon = true,
  sx,
  className,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const totalItems = items.length;
  // The immediate parent item is the one right before the active/current item (the last item)
  const parentItem = totalItems > 1 ? items[totalItems - 2] : null;
  const currentItem = items[totalItems - 1];

  return (
    <Box
      className={className}
      component="nav"
      aria-label="breadcrumb"
      sx={{
        py: 1,
        px: 2,
        borderRadius: '8px',
        backgroundColor: 'background.paper',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 1px 3px rgba(0,0,0,0.4)'
            : '0 1px 3px rgba(0,0,0,0.05)',
        width: 'fit-content',
        ...sx,
      }}
    >
      {/* Mobile View: Shows only the immediate parent page as a back-link */}
      {parentItem ? (
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {showMobileBackIcon && (
            <ChevronLeftIcon
              sx={{
                color: 'primary.main',
                fontSize: '1.25rem',
                flexShrink: 0,
              }}
            />
          )}
          <BreadcrumbLink
            href={parentItem.href}
            onClick={parentItem.onClick}
            component={parentItem.component}
            {...parentItem.props}
          >
            {parentItem.label}
          </BreadcrumbLink>
        </Box>
      ) : (
        /* Mobile fallback if there's only 1 item and no parent exists */
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: '0.925rem',
              color: 'text.secondary',
            }}
          >
            {currentItem.label}
          </Typography>
        </Box>
      )}

      {/* Desktop View: Shows the full breadcrumb trail */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === totalItems - 1;

          if (isLast) {
            return (
              <Typography
                key={`breadcrumb-current-${index}`}
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.925rem',
                  color: 'text.secondary',
                  userSelect: 'text',
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <React.Fragment key={`breadcrumb-item-${index}`}>
              <BreadcrumbLink
                href={item.href}
                onClick={item.onClick}
                component={item.component}
                {...item.props}
              >
                {item.label}
              </BreadcrumbLink>
              <SeparatorContainer>{separator}</SeparatorContainer>
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
