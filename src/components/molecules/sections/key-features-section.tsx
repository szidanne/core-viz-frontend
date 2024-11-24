"use client";
import React from "react";
import Section from "@/components/molecules/section";
import RoundedButton from "@/components/atoms/rounded-button";

const KeyFeaturesSection = () => {
  return (
    <Section
      title="Key features"
      description="Explore the powerful features that make our product stand out."
      extra={<RoundedButton onClick={() => {}}>Learn more</RoundedButton>}
      reverse
      image="https://picsum.photos/id/227/600/400"
    />
  );
};

export default KeyFeaturesSection;
