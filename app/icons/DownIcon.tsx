import React from "react";
import IconWrapper from "../hoc-components/IconWrapper";
import type { IconProps } from "../types/iconProps";

const DownIcon: React.FC<IconProps> = (props) => (
<svg width="17" height="14" viewBox="0 0 17 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
<path d="M4.0332 4.8418C3.78899 4.61503 3.78899 4.24239 4.0332 4.01562C4.27106 3.7948 4.65278 3.79478 4.89062 4.01562L10 8.76074L15.1094 4.0166C15.3472 3.79574 15.7289 3.79574 15.9668 4.0166C16.0867 4.12803 16.1503 4.27706 16.1504 4.42871C16.1504 4.5424 16.1148 4.65541 16.0459 4.75195L15.9668 4.8418L10.4287 9.98437C10.1909 10.2052 9.80914 10.2052 9.57129 9.98437L4.0332 4.8418Z" fill="#667085" stroke="#667085" />
</svg>

);

export default IconWrapper(DownIcon);