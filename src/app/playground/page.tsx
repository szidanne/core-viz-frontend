"use client";
import PageTemplate from "@/components/templates/page-template";
import { classNames } from "@/theme/classNames";
import UploadPage from "@/components/pages/UploadPage";
import { FileProvider } from "@/context/file-context";

export default function Home() {
  return (
    <FileProvider>
      <PageTemplate>
        <div
          className={`flex w-full justify-center py-4 ${classNames.horizontalPadding}`}
        >
          <div className={`w-full ${classNames.maxWidth}`}>
            <UploadPage />
          </div>
        </div>
      </PageTemplate>
    </FileProvider>
  );
}
