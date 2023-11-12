"use client";

import type { CustomButtonProps } from "@/components/types/types";

/**
 * @alias Button
 * @returns {HTMLButtonElement}
 */
export const CustomButton = ({
  label,
  className,
  type,
  onClick
}: CustomButtonProps) => {
  return (
    <button
      className="rounded-md bg-sky-600 hover:bg-gray-900 duration-300 font-bold text-white w-[240px] h-[36px]"
      type={type}
      /// @ts-ignore
      onClick={onClick}
    >
      {label}
    </button>
  )
}
