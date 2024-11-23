"use client";
import React from "react";
import Section from "@/components/molecules/section";

const HeroSection = () => {
  return (
    <Section
      image="https://picsum.photos/id/232/600/400"
      lightBackground="bg-gradient-to-r from-blue-200 to-indigo-200"
      darkBackground="bg-gradient-to-r from-slate-700 to-gray-800"
      title="Turn your data into stunning visuals"
      description="Upload your data, customize your charts, and share your insights effortlessly."
      buttonText="Get started"
      onButtonClick={() => {}}
    />
  );
};
export default HeroSection;
