import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';

export interface IconProps extends Omit<SvgIconProps, 'component'> {
  /** 
   * A custom SVG component (e.g. from SVGR) or an HTML SVG element.
   * If passing raw SVG elements (like <path>), pass them as children instead.
   */
  component?: React.ElementType;
}

/**
 * A highly customizable, generic Icon component.
 * It is fully responsive and integrates deeply with the project's theme.
 * 
 * Usage:
 * 1. With an SVGR component: <Icon component={MySvgFile} color="primary" />
 * 2. With SVG paths: <Icon viewBox="0 0 24 24" color="error"><path d="..." /></Icon>
 */
export const Icon: React.FC<IconProps> = ({ component, children, ...props }) => {
  return (
    <SvgIcon 
      component={component} 
      // inheritViewBox is crucial when passing custom SVG components 
      // to ensure they scale responsively without clipping.
      inheritViewBox={!!component} 
      {...props}
      sx={{
        // Add smooth transitions for color/size changes
        transition: 'color 0.2s, font-size 0.2s',
        ...props.sx
      }}
    >
      {children}
    </SvgIcon>
  );
};
