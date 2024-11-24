"use client";
import React from "react";
import Section from "@/components/molecules/section";
import RoundedButton from "@/components/atoms/rounded-button";

const UserWorkflowsSection = () => {
  return (
    <Section
      title="Optimized user workflows"
      description="Our product is designed to improve the efficiency of your team's workflows."
      extra={<RoundedButton onClick={() => {}}>Start using</RoundedButton>}
      lightBackground="bg-gray-200"
      darkBackground="bg-jet"
      image="https://picsum.photos/id/427/600/400"
    />
  );
};

export default UserWorkflowsSection;
