import { IconProps } from "@/app/types/iconProps";
import { ComponentType, ReactNode } from "react";

export interface SidebarItemProps {
  label?: string;
  key?: number | string;
  path?: string;
  isActive?: boolean;
  currentPathName?: string;
  iconProps: {
    icon  ?:ReactNode | ComponentType<IconProps>;
    size?: string | number;
    className?: string;
    color?: string;
    tooltip?: string;
  }

}