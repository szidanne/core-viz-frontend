"use client";
import React from "react";
import Section from "@/components/molecules/section";

const DemoSection = () => {
  return (
    <Section
      title="See the product in action"
      description="Watch a demo of how our product works and how it can benefit your team."
      lightBackground="bg-gray-200"
      darkBackground="bg-jet"
    >
      <div className="flex flex-col max-w-lg">
        <img
          className="rounded-lg"
          src={"https://picsum.photos/id/237/600/400"}
          alt={""}
        />
        Video
      </div>
    </Section>
  );
};

export default DemoSection;
