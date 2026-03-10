import React, { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
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
            sx={{
              mb: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderRadius: '8px !important',
              '&:before': {
                display: 'none', // Remove default MUI top border
              },
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              border: `1px solid ${expanded ? theme.palette.primary.main : 'transparent'}`,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: expanded ? theme.palette.primary.main : 'inherit' }} />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
              sx={{
                backgroundColor: expanded ? `${theme.palette.primary.main}0A` : 'transparent', // very light primary bg on expand
                '&:hover': {
                  backgroundColor: `${theme.palette.background.default}`,
                },
                transition: 'background-color 0.2s',
              }}
            >
              <Typography
                sx={{
                  fontWeight: expanded ? 600 : 500,
                  color: expanded ? theme.palette.primary.main : 'text.primary',
                  transition: 'color 0.2s',
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: '#fff',
                p: 2.5,
              }}
            >
              <Box>{item.content}</Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
