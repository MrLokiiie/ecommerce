"use client";

import { Input } from "@/components/ui/input";
import type { AuthFormInput } from "@/components/types/types";

/**
 * @alias AuthFormInput
 * @type {AuthFormInput}
 * @returns {HTMLInputElement}
 */
export const AuthInput = ({
  isRequired,
  id,
  label,
  register,
  description,
  type,
  disabled
}: AuthFormInput) => {
  return (
    <div className="space-y-4 gap-x-2">
      <div className="mb-1">
        <label htmlFor={id}>
          {label}
        </label>
      </div>
      <input
        required={isRequired}
        id={id}
        autoComplete={id}
        type={type}
        disabled={disabled}
        {...register(id as string, { required: isRequired })}
        className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow"
      />
      <div className="mt-[1px] mb-4">
        <span className="font-semibold text-[11px] text-muted-foreground">
          {description}
        </span>
      </div>
    </div>
  )
}
