import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Typography, Link } from "@mui/material";
import { PlanCard } from "./PlanCard";
import { PillButton } from "../PillButton";
import { InfoMessage } from "../InfoMessage";

const meta = {
  title: "Components/PlanCard",
  component: PlanCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "background.default", maxWidth: "900px", mx: "auto" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof PlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Custom rendering of bullet points and footer link for the Plan details accordion
const PlanDetailsContent = () => {
  const details = [
    "$34 average monthly premium¹",
    "$0 routine dental check-ups, including cleanings and routine x-rays²",
    "$50 individual and $150 family annual deductible apply to basic and major restorative services",
    "$1,000 in benefits available that can apply toward things like fillings, crowns, root canals, and more",
    "No referrals needed",
    "No waiting periods for select services³",
    "Access to our convenient nationwide Advantage Network⁴",
    "24/7/365 customer service",
    "One-stop plan access and help choosing the right dentist with the Brighter Score® feature on myCigna.com® or the myCigna® App⁵",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box component="ul" sx={{ m: 0, pl: 2.5, display: "flex", flexDirection: "column", gap: 1.25 }}>
        {details.map((detail, index) => (
          <Box
            component="li"
            key={index}
            sx={{
              fontSize: "14px",
              color: "text.primary",
              lineHeight: 1.5,
              fontWeight: 400,
              "&::marker": {
                color: "text.secondary",
              },
            }}
          >
            {detail}
          </Box>
        ))}
      </Box>

      {/* Footer Link section */}
      <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 500, color: "text.secondary" }}>
        Looking for additional savings on your dental care?{" "}
        <Link href="#" underline="always" sx={{ color: "primary.main", fontWeight: 600 }}>
          Learn more about our discount plans
        </Link>
      </Typography>
    </Box>
  );
};

// Default full card matches screenshots
export const DefaultPlanCard: Story = {
  args: {
    overline: "YOUR PLAN",
    badge: "Active",
    title: "Cigna Dental Complete",
    subtitle: "Effective date: 05/01/2026",
    headerAction: (
      <PillButton
        label="Manage plan"
        showDropdownIcon
        onClick={() => alert("Manage plan clicked")}
      />
    ),
    stats: [
      { value: "$1,000", label: "Annual maximum" },
      { value: "$50", label: "Individual deductible" },
      { value: "$150", label: "Family deductible" },
    ],
    infoMessage: (
      <InfoMessage
        message="Your waiting period for [benefit(s)] has been waived."
      />
    ),
    accordionTitle: "Plan details",
    accordionContent: <PlanDetailsContent />,
  },
};

// Initial state shown as expanded by default
export const DefaultPlanCardExpanded: Story = {
  args: {
    ...DefaultPlanCard.args,
    accordionDefaultExpanded: true,
  },
};

// Showcase populating details directly using an array of strings (ideal for API data)
export const ApiDataPopulated: Story = {
  args: {
    overline: "YOUR PLAN",
    badge: "Active",
    title: "Cigna Dental Complete",
    subtitle: "Effective date: 05/01/2026",
    headerAction: <PillButton label="Manage plan" showDropdownIcon />,
    stats: [
      { value: "$1,000", label: "Annual maximum" },
      { value: "$50", label: "Individual deductible" },
      { value: "$150", label: "Family deductible" },
    ],
    infoMessage: <InfoMessage message="Your waiting period for [benefit(s)] has been waived." />,
    accordionTitle: "Plan details",
    accordionDefaultExpanded: true,
    accordionDetails: [
      "$34 average monthly premium¹",
      "$0 routine dental check-ups, including cleanings and routine x-rays²",
      "$50 individual and $150 family annual deductible apply to basic and major restorative services",
      "$1,000 in benefits available that can apply toward things like fillings, crowns, root canals, and more",
      "No referrals needed",
      "No waiting periods for select services³",
      "Access to our convenient nationwide Advantage Network⁴",
    ],
    accordionFooterText: "Looking for additional savings on your dental care?",
    accordionFooterLinkText: "Learn more about our discount plans",
    accordionFooterLinkUrl: "https://www.cigna.com",
  },
};

// Minimalistic configuration
export const MinimalCard: Story = {
  args: {
    title: "Basic Health Plan",
    subtitle: "Individual Level",
    headerAction: <PillButton label="View Plan" />,
    stats: [
      { value: "$5,000", label: "Out of pocket max" },
      { value: "$0", label: "Preventive care copay" },
    ],
  },
};

// Card containing custom children sections to demonstrate flexibility
export const CustomSectionsDemo: Story = {
  args: {
    title: "Family Care Premium",
    headerAction: <PillButton label="Actions" showDropdownIcon />,
    stats: [
      { value: "$2,000", label: "Annual maximum" },
      { value: "$100", label: "Deductible" },
    ],
    infoMessage: (
      <InfoMessage
        message="This is a helper info message rendered inside the card."
      />
    ),
    children: (
      <Box
        sx={{
          p: 2.5,
          borderRadius: "12px",
          bgcolor: "primary.light",
          color: "primary.contrastText",
          backgroundColor: "rgba(0, 91, 159, 0.04)",
          border: "1.5px dashed",
          borderColor: "primary.main",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: "primary.main" }}>
          Other Section Slot
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          You can inject other sections, custom list panels, or components directly into the card body through
          the standard react children slot.
        </Typography>
      </Box>
    ),
  },
};
