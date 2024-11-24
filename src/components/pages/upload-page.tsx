"use client";
import React from "react";
import Typography from "@/components/atoms/typography";
import Upload from "@/components/molecules/upload";
import { useFileContext } from "@/context/file-context";
import { Table } from "antd";
import RoundedButton from "@/components/atoms/rounded-button";

interface Props {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

const UploadPage: React.FC<Props> = ({ setStep = () => {} }) => {
  const { file, setFile, fileData } = useFileContext();

  return (
    <div className="flex flex-col gap-4">
      <Typography size="xl" weight="semibold">
        Upload data file (CSV or JSON)
      </Typography>
      <Upload onChange={(file) => setFile(file)} file={file} />
      {file && (
        <div className="flex flex-col gap-3 items-end mt-3">
          <RoundedButton
            type="primary"
            className="w-fit"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Chart builder
          </RoundedButton>
          <div className="w-full">
            <Typography size="base" weight="semibold">
              Data preview
            </Typography>
          </div>
          <Table
            size="small"
            dataSource={fileData?.dataSource}
            columns={fileData?.columns}
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
