import React from "react";
import { cn } from "@/lib/utils";

type OrangePillProps = {
  children: React.ReactNode;
  className?: string;
};

export const OrangePill: React.FC<OrangePillProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-brand-orange text-white font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full",
        className,
      )}
    >
      {children}
    </span>
  );
};
