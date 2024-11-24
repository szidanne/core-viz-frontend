import { IconType } from "react-icons";

export type InputType =
  | "radio"
  | "checkbox"
  | "select"
  | "text"
  | "color"
  | "textarea";
export type Option = { label: string; value: string; icon?: IconType };

export interface FormInput {
  id: string;
  label: string;
  tooltip?: string;
  placeholder?: string;
  type: InputType;
  options?: Option[];
}
