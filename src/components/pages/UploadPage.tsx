"use client";
import React, { useEffect, useState } from "react";
import Typography from "@/components/atoms/typography";
import Upload from "@/components/molecules/Upload";
import parseFile from "@/utils/file-parser";
import { useFileContext } from "@/context/file-context";
import { Table } from "antd";
import RoundedButton from "@/components/atoms/rounded-button";

const UploadPage: React.FC = () => {
  const { file, setFile, fileData } = useFileContext();

  return (
    <div className="flex flex-col gap-4">
      <Typography size="xl" weight="semibold">
        Upload data file (CSV or JSON)
      </Typography>
      <Upload onChange={(file) => setFile(file)} file={file} />
      {file && (
        <div className="flex flex-col gap-3 items-end mt-3">
          <RoundedButton type="primary" className="w-fit">
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
