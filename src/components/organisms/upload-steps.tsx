import React from "react";
import { Steps } from "antd";
import UploadPage from "@/components/pages/upload-page";
import { useFileContext } from "@/context/file-context";
import { classNames } from "@/theme/classNames";
import ChartBuilder from "@/components/pages/chart-builder";
import Dashboard from "@/components/pages/dashboard";

interface Props {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

const UploadSteps: React.FC<Props> = ({ current, setCurrent }) => {
  const { file } = useFileContext();

  const steps = [
    {
      key: "upload",
      title: "Upload file",
      render: <UploadPage setStep={setCurrent} />,
    },
    {
      key: "build",
      title: "Build charts",
      render: <ChartBuilder setStep={setCurrent} />,
    },
    {
      key: "dashboard",
      title: "Dashboard",
      render: <Dashboard />,
    },
  ];

  return (
    <div className={`w-full flex flex-col gap-8 ${classNames.maxWidth}`}>
      <Steps
        size="small"
        current={current}
        items={steps.map(({ title }) => ({ title }))}
        onChange={(step) => file && setCurrent(step)}
      />
      {steps[current].render}
    </div>
  );
};

export default UploadSteps;
