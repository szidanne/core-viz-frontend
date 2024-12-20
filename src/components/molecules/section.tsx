"use client";
import React, { useMemo } from "react";
import { useTheme } from "@/context/theme-context";
import { classNames } from "@/theme/classNames";
import Typography from "@/components/atoms/typography";
import RoundedButton from "@/components/atoms/rounded-button";
import { ButtonType } from "antd/es/button"; // Import Typography

export interface SectionProps {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  reverse?: boolean; // Reverse the image and content layout (default is false)
  lightBackground?: string;
  darkBackground?: string;
  className?: string;
  extra?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  image,
  children,
  reverse = false, // Optional: Reverse the layout for visual appeal
  lightBackground = "bg-light-surface",
  darkBackground = "bg-dark-surface",
  className = "",
  extra,
}) => {
  const { theme } = useTheme();

  const backgroundClass = useMemo(
    () => (theme === "light" ? lightBackground : darkBackground),
    [theme, lightBackground, darkBackground],
  );

  return (
    <section
      className={`py-8 md:py-14 w-full ${classNames.horizontalPadding} ${backgroundClass} flex justify-center ${className}`}
    >
      <div
        className={`w-full ${classNames.maxWidth} ${
          reverse
            ? "md:flex-row-reverse lg:flex-row-reverse"
            : "md:flex-row lg:flex-row"
        } flex items-center justify-between flex-col-reverse gap-6`}
      >
        {(title || description || extra) && (
          <div className="max-w-2xl w-full">
            {title && (
              <Typography
                as="h2"
                size="xl"
                weight="semibold"
                className="mb-2 md:mb-6 md:text-3xl"
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                as="p"
                size="xxs"
                lightModeColor="text-gray-700"
                darkModeColor="text-gray-300"
                className="md:text-base"
              >
                {description}
              </Typography>
            )}
            {extra && (
              <div className="flex items-center gap-2 mt-4 md:mt-6">
                {extra}
              </div>
            )}
          </div>
        )}
        {image && (
          <div className="w-full max-w-lg md:max-h-screen">
            <img
              src={image}
              alt="Section image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
