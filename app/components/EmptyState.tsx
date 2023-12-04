"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Heading from "./modals/Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches found",
  subtitle = "Try changing or removing a filter to find more listings.",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 items-center justify-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
