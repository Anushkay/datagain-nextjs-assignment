'use client';
import { Button } from "@heroui/react";
import { SidebarItemProps } from "./types";
import Link from "next/link";

export default function SidebarItem({
  path,
  label,
  isActive,
  iconProps
}: SidebarItemProps) {
  return (
    <li>
      <Button
        startContent={
          iconProps.icon
            ? (() => {
                const IconComponent = iconProps.icon as React.ElementType;
                return <IconComponent size={iconProps.size} className={iconProps.className} />;
              })()
            : null
        }
        as={Link}
        href={path}
        variant="light"
        color={isActive ? 'primary' : 'default'}
        fullWidth
        className={`justify-start text-sm font-light px-4 py-3 rounded-[5px] text-white ${isActive ? 'bg-white/20' : 'bg-transparent'}`}
      >
        {label}
      </Button>
    </li>
  );
}