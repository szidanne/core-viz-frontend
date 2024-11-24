"use client";
import React from "react";
import Section from "@/components/molecules/section";
import RoundedButton from "@/components/atoms/rounded-button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <Section
      image="https://picsum.photos/id/232/600/400"
      lightBackground="bg-gradient-to-r from-blue-200 to-indigo-200"
      darkBackground="bg-gradient-to-r from-slate-700 to-gray-800"
      title="Turn your data into stunning visuals"
      description="Upload your data, customize your charts, and share your insights effortlessly."
      reverse
      extra={
        <RoundedButton
          type="primary"
          size="large"
          onClick={() => {
            router.push("/playground");
          }}
        >
          Get started
        </RoundedButton>
      }
    />
  );
};
export default HeroSection;
