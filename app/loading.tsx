'use client';
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <Spinner label="Loading..." />
    </div>
  );
}
