import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";
import { Filter, type FilterField } from "./Filter";

const meta = {
  title: "Components/Filter",
  component: Filter,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "background.default", minHeight: "350px" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Payment filters fields mockup configuration matching the screenshots
const paymentFilterFields: FilterField[] = [
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All", value: "All" },
      { label: "Active", value: "Active" },
      { label: "Pending", value: "Pending" },
      { label: "Failed", value: "Failed" },
    ],
  },
  {
    id: "paymentType",
    label: "Payment type",
    type: "select",
    options: [
      { label: "All", value: "All" },
      { label: "Adjustment, auto payment", value: "Adjustment, auto payment" },
      { label: "Manual payment", value: "Manual payment" },
    ],
  },
  {
    id: "paymentMethod",
    label: "Payment method",
    type: "select",
    options: [
      { label: "All", value: "All" },
      { label: "Credit card", value: "Credit card" },
      { label: "Bank account", value: "Bank account" },
      { label: "PayPal", value: "PayPal" },
    ],
  },
  {
    id: "startDate",
    label: "Start date",
    type: "date",
  },
  {
    id: "endDate",
    label: "End date",
    type: "date",
  },
];

// Interactive state wrapper for live demos
const FilterStateWrapper = (args: any) => {
  const [filters, setFilters] = useState<Record<string, any>>({
    status: "All",
    paymentType: "Adjustment, auto payment",
    paymentMethod: "Credit card",
    startDate: new Date("2026-01-03"),
    endDate: new Date("2026-01-06"),
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Filter
        {...args}
        value={filters}
        onChange={(updated) => setFilters(updated)}
        onApply={(applied) => alert(JSON.stringify(applied, null, 2))}
        onClear={() => alert("Cleared all filters")}
      />
      <Box
        sx={{
          p: 2.5,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Current Active Filter Values:
        </Typography>
        <pre style={{ margin: 0, fontSize: "13px", color: "#475569" }}>
          {JSON.stringify(filters, null, 2)}
        </pre>
      </Box>
    </Box>
  );
};

export const DesktopView: Story = {
  render: FilterStateWrapper,
  args: {
    fields: paymentFilterFields,
  },
};

// Bounded mobile view container story to test mobile responsiveness directly
export const MobileView: Story = {
  render: (args) => (
    <Box sx={{ width: "375px", border: "1.5px dashed #94a3b8", borderRadius: "24px", p: 2, bgcolor: "background.paper" }}>
      <FilterStateWrapper {...args} />
    </Box>
  ),
  args: {
    fields: paymentFilterFields,
  },
};

// Completely empty/initial state demo
export const EmptyInitialState: Story = {
  render: (args) => {
    const [filters, setFilters] = useState<Record<string, any>>({
      status: "All",
      paymentType: "All",
      paymentMethod: "All",
      startDate: null,
      endDate: null,
    });
    return (
      <Filter
        {...args}
        value={filters}
        onChange={(updated) => setFilters(updated)}
        onApply={(applied) => alert(JSON.stringify(applied, null, 2))}
      />
    );
  },
  args: {
    fields: paymentFilterFields,
  },
};
