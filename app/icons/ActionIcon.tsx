import React from "react";
import IconWrapper from "../hoc-components/IconWrapper";
import type { IconProps } from "../types/iconProps";

const ActionIcon: React.FC<IconProps> = (props) => (
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<circle cx="20" cy="20" r="20" fill="#E5E8EE"/>
<circle cx="1.86658" cy="1.86658" r="1.86658" transform="matrix(-8.74228e-08 1 1 8.74228e-08 18.1333 11.2)" fill="#2D2E34"/>
<circle cx="1.86658" cy="1.86658" r="1.86658" transform="matrix(-8.74228e-08 1 1 8.74228e-08 18.1333 18.666)" fill="#2D2E34"/>
<circle cx="1.86658" cy="1.86658" r="1.86658" transform="matrix(-8.74228e-08 1 1 8.74228e-08 18.1333 26.1335)" fill="#2D2E34"/>
</svg>

);

export default IconWrapper(ActionIcon);