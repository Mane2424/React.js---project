import React from "react";

import { ISvgIcons, svgIcons } from "src/assets/icons/svg";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: keyof ISvgIcons; // Name of the SVG icon
  width?: number; // Width of the icon
  height?: number; // Height of the icon
  color?: string; // Color of the icon
}

const Icon: React.FC<IconProps> = (
  {
    name,
    width = 18,
    height = 18,
    color = "currentColor",
    ...props
  }) => {
  if (!svgIcons[name as keyof ISvgIcons]) {
    return <></>;
  }

  // Dynamically import the SVG file based on the icon name
  let Icon = svgIcons[name];
  return <div style={{ width: `${width}px`, height: `${height}px`, color }} {...props}>
    <Icon />
  </div>
};

export default Icon;