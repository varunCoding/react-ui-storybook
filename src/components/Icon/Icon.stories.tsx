import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography } from '@mui/material';
import { Icon } from './Icon';

const meta = {
  title: 'Data Display/Icon',
  component: Icon,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, bgcolor: 'background.default', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// An example SVG Component (simulating SVGR import: import { ReactComponent as StarIcon } from './star.svg')
const StarSvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const Default: Story = {
  args: {
    component: StarSvgComponent,
    color: 'primary',
  },
};

export const CustomColors: Story = {
  render: () => (
    <>
      <Icon component={StarSvgComponent} color="primary" />
      <Icon component={StarSvgComponent} color="secondary" />
      <Icon component={StarSvgComponent} color="error" />
      <Icon component={StarSvgComponent} color="warning" />
      <Icon component={StarSvgComponent} color="info" />
      <Icon component={StarSvgComponent} color="success" />
      {/* Custom color via sx */}
      <Icon component={StarSvgComponent} sx={{ color: '#E91E63' }} />
    </>
  ),
};

export const ResponsiveSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
      <Icon component={StarSvgComponent} fontSize="small" />
      <Icon component={StarSvgComponent} fontSize="medium" />
      <Icon component={StarSvgComponent} fontSize="large" />
      {/* Custom size via sx */}
      <Icon component={StarSvgComponent} sx={{ fontSize: 60 }} />
      <Icon component={StarSvgComponent} sx={{ fontSize: '4rem' }} />
    </Box>
  ),
};

export const WithChildrenPaths: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Passing &lt;path&gt; directly as children:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Icon viewBox="0 0 24 24" color="primary">
          <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
        </Icon>
        <Icon viewBox="0 0 24 24" color="success">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </Icon>
      </Box>
    </Box>
  ),
};
