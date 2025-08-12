// types/iconProps.ts
import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  tooltip?: string;
  onClick?: () => void; 
}