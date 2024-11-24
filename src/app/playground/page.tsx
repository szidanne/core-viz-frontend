"use client";
import PageTemplate from "@/components/templates/page-template";
import { classNames } from "@/theme/classNames";
import { FileProvider } from "@/context/file-context";
import { useState } from "react";
import UploadSteps from "@/components/organisms/upload-steps";
import { DashboardProvider } from "@/context/dashboard-context";

export default function Home() {
  const [current, setCurrent] = useState(0);
  return (
    <FileProvider>
      <DashboardProvider>
        <PageTemplate>
          <div
            className={`flex w-full justify-center py-4 ${classNames.horizontalPadding}`}
          >
            <UploadSteps current={current} setCurrent={setCurrent} />
          </div>
        </PageTemplate>
      </DashboardProvider>
    </FileProvider>
  );
}
