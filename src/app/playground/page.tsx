"use client";
import PageTemplate from "@/components/templates/page-template";
import { classNames } from "@/theme/classNames";
import { FileProvider } from "@/context/file-context";
import { useState } from "react";
import UploadSteps from "@/components/organisms/upload-steps";
import { DashboardProvider } from "@/context/dashboard-context";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "@/context/theme-context";

export default function Home() {
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
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
    </ConfigProvider>
  );
}
