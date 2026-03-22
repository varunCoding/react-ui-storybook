import React, { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AccordionItem {
  id: string;
  /** Main title displayed in both open and closed states */
  title: ReactNode;
  /** Status indicator (e.g., 'Complete', 'Incomplete') displayed only in the closed state */
  status?: ReactNode;
  /** Content to display when the accordion is expanded. Supports complex forms and inputs. */
  content: ReactNode;
  /** Custom CSS overrides for this specific accordion item */
  sx?: SxProps<Theme>;
}

export interface GenericAccordionProps {
  /** Array of items to display in the accordion */
  items: AccordionItem[];
  /** If true, multiple accordions can be open at the same time. Defaults to false. */
  allowMultiple?: boolean;
}

export const GenericAccordion: React.FC<GenericAccordionProps> = ({
  items,
  allowMultiple = false,
}) => {
  const theme = useTheme();

  // State for single-open mode
  const [expandedId, setExpandedId] = useState<string | false>(false);
  
  // State for multi-open mode
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleChange = (id: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    if (allowMultiple) {
      const newExpandedIds = new Set(expandedIds);
      if (isExpanded) {
        newExpandedIds.add(id);
      } else {
        newExpandedIds.delete(id);
      }
      setExpandedIds(newExpandedIds);
    } else {
      setExpandedId(isExpanded ? id : false);
    }
  };

  const isExpanded = (id: string) => {
    return allowMultiple ? expandedIds.has(id) : expandedId === id;
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      {items.map((item) => {
        const expanded = isExpanded(item.id);
        
        return (
          <Accordion
            key={item.id}
            expanded={expanded}
            onChange={handleChange(item.id)}
            elevation={0}
            sx={{
               mb: 1.5,
               '&:before': {
                 display: 'none',
               },
               border: expanded ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
               borderRadius: '12px !important',
               backgroundColor: expanded ? '#f8fafc' : 'background.paper',
               transition: 'all 0.2s ease',
               ...item.sx,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
              sx={{ px: { xs: 2, sm: 3 }, py: 1 }}
            >
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                <Typography sx={{ 
                  fontWeight: expanded ? 700 : 600, 
                  fontSize: '1.05rem',
                  color: expanded ? 'text.primary' : theme.palette.primary.main,
                  transition: 'color 0.2s'
                }}>
                  {item.title}
                </Typography>
                
                {/* Only show status if it is provided and the accordion is CLOSED */}
                {!expanded && item.status && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {typeof item.status === 'string' ? (
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {item.status}
                      </Typography>
                    ) : (
                      item.status
                    )}
                  </Box>
                )}
              </Box>
            </AccordionSummary>
            
            <AccordionDetails sx={{ p: { xs: 2, sm: 3 } }}>
              {/* Form Content Wrapper */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {item.content}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
