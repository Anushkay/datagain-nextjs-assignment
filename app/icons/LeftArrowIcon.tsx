

import React from "react";
import IconWrapper from "../hoc-components/IconWrapper";
import type { IconProps } from "../types/iconProps";

const LeftArrowIcon: React.FC<IconProps> = (props) => (
<svg  viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  {...props}
>
<g filter="url(#filter0_d_7825_162480)">
<path d="M22 35.3333C14.6362 35.3333 8.66671 29.3638 8.66671 22C8.66671 14.6362 14.6362 8.66666 22 8.66666C29.3638 8.66666 35.3334 14.6362 35.3334 22C35.3334 29.3638 29.3638 35.3333 22 35.3333Z" fill="white"/>
<path d="M23.68 27.7067C23.9333 27.7067 24.1866 27.6133 24.3866 27.4133C24.7733 27.0267 24.7733 26.3867 24.3866 26L20.3866 22L24.3866 18C24.7733 17.6133 24.7733 16.9733 24.3866 16.5867C24 16.2 23.36 16.2 22.9733 16.5867L18.2666 21.2933C17.88 21.68 17.88 22.32 18.2666 22.7067L22.9733 27.4133C23.1733 27.6133 23.4266 27.7067 23.68 27.7067Z" fill="#4ED6BE"/>
</g>
<defs>
<filter id="filter0_d_7825_162480" x="-2" y="-2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feGaussianBlur stdDeviation="5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.419608 0 0 0 0 0.447059 0 0 0 0 0.501961 0 0 0 0.3 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7825_162480"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7825_162480" result="shape"/>
</filter>
</defs>
</svg>
);

export default IconWrapper(LeftArrowIcon);
