import React from "react";

import {
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

export interface AuthFormInput extends React.HTMLInputTypeAttribute {
  isRequired: boolean;
  id?: string;
  label?: string;
  description?: string;
  type: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>
}

/* interface AllAuthInputsTypes extends AuthFormInput {
    isRequired: AuthFormInput['isRequired'];
    id?: AuthFormInput['id'];
    label?: AuthFormInput['label'];
    description?: AuthFormInput['description'];
} */

export interface ButtonLinkProps extends React.ButtonHTMLAttributes {
  href: string;
  label: string;
  className: string;
  buttonVisible?: boolean;
}

export interface CustomButtonProps extends React.ButtonHTMLAttributes {
  label: string;
  className?: string;
  type?: React.ButtonHTMLAttributes;
  onClick: Function;
}
