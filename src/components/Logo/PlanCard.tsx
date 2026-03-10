import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface PlanCardProps {
  /** The name of the insurance plan */
  planName: string;
  /** The price string (e.g. "$29") */
  price: string;
  /** The billing period (e.g. "/mo") */
  period?: string;
  /** List of features included in the plan */
  features: string[];
  /** Highlights the card as a recommended option */
  isRecommended?: boolean;
  /** Callback when the select button is clicked */
  onSelect?: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  price,
  period = "/mo",
  features,
  isRecommended = false,
  onSelect,
}) => {
  return (
    <Card
      variant={isRecommended ? "elevation" : "outlined"}
      sx={{
        position: "relative",
        borderColor: isRecommended ? "primary.main" : undefined,
        borderWidth: isRecommended ? 2 : 1,
        boxShadow: isRecommended ? 4 : undefined,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      {isRecommended && (
        <Chip
          label="Recommended"
          color="primary"
          size="small"
          sx={{ position: "absolute", top: 12, right: 12 }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
          {planName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
          <Typography
            variant="h3"
            component="span"
            color="text.primary"
            fontWeight="bold"
          >
            {price}
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            color="text.secondary"
            sx={{ ml: 0.5 }}
          >
            {period}
          </Typography>
        </Box>
        <List dense>
          {features.map((feature, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          size="large"
          variant={isRecommended ? "contained" : "outlined"}
          onClick={onSelect}
        >
          Select Plan
        </Button>
      </CardActions>
    </Card>
  );
};
