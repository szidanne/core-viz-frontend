"use client";
import React, { useMemo } from "react";
import { inter } from "@/theme/font";
import { useTheme } from "@/context/theme-context";
import Link from "next/link";
import { JSX } from "react/jsx-runtime";

type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  size?:
    | "small"
    | "base"
    | "large"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "xs"
    | "xxs"
    | "3xs"
    | "4xs";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  lightModeColor?: string;
  darkModeColor?: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
};

const Typography: React.FC<TypographyProps> = ({
  as = "p",
  size = "small",
  weight = "normal",
  lightModeColor = "text-gray-900",
  darkModeColor = "text-gray-100",
  className = "",
  children,
  href,
}) => {
  const { theme } = useTheme();

  const sizeClasses = useMemo(
    () => ({
      small: "text-sm",
      base: "text-base",
      large: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      xs: "text-xs",
      xxs: "text-xxs",
      "3xs": "text-3xs",
      "4xs": "text-4xs",
    }),
    [],
  );

  const weightClasses = useMemo(
    () => ({
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    }),
    [],
  );

  const classes = useMemo(
    () =>
      [
        inter.className,
        sizeClasses[size], // Font size
        weightClasses[weight], // Font weight
        theme === "light" ? lightModeColor : darkModeColor,
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [theme, size, weight, lightModeColor, darkModeColor, className],
  );

  const Element = as;

  return href ? (
    <Link href={href}>
      <Element className={classes}>{children}</Element>
    </Link>
  ) : (
    <Element className={classes}>{children}</Element>
  );
};

export default Typography;
