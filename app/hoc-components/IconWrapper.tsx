import React from "react";
import type { IconProps } from "../types/iconProps";
import { Tooltip } from "@heroui/react";

function withIcon<T extends IconProps>(Component: React.ComponentType<T>) {
  const WrappedIcon: React.FC<IconProps> = ({
    size = 40, 
    color = 'currentColor',
    className = '',
    tooltip, 
    ...props
  }) => {
    const sizes = { sm: 24, md: 32, lg: 40, xl: 48 }; 
    const computedSize = typeof size === 'number' ? size : sizes[size] || size;

    const iconElement = (
      <Component
        {...props as T}
        width={computedSize}
        height={computedSize}
        color={color}
        className={`${className} focus:outline-none focus:ring-0`}
      />
    );

    return tooltip ? (
      <Tooltip
        content={tooltip}
        size="sm"
        placement="top"
        className="z-50"
      >
        {iconElement}
      </Tooltip>
    ) : (
      iconElement
    );
  };

  WrappedIcon.displayName = `withIcon(${Component.displayName || Component.name || 'Icon'})`;
  
  return WrappedIcon;
}

export default withIcon;