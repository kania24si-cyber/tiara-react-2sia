import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all duration-300 outline-none select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF7B7B] text-white hover:bg-[#ED346C] shadow-md",

        secondary:
          "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-md",

        success:
          "bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-md",

        warning:
          "bg-[#F59E0B] text-white hover:bg-[#D97706] shadow-md",

        destructive:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-md",

        outline:
          "border border-[#FF7B7B] text-[#ED346C] bg-white hover:bg-pink-50",

        ghost:
          "hover:bg-pink-50 hover:text-[#ED346C]",

        link:
          "text-[#ED346C] underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-4 py-2",

        xs: "h-6 px-2 text-xs",

        sm: "h-8 px-3 text-sm",

        lg: "h-12 px-6 text-base",

        icon: "size-10",

        "icon-xs": "size-6",

        "icon-sm": "size-8",

        "icon-lg": "size-12",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
