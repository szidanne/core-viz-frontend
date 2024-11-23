"use client";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";

const PageWrapper: React.FC<Template> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
export default PageWrapper;
