import React from "react";
import type { UploadFile, UploadProps } from "antd";
import { Upload as AntUpload } from "antd";
import { IoAdd } from "react-icons/io5";

const { Dragger } = AntUpload;

interface Props {
  acceptedFileTypes?: string[];
  onChange?: (file: any | undefined) => void;
  file?: any;
}

const Upload: React.FC<Props> = ({
  acceptedFileTypes = ["text/csv", "application/json"],
  onChange = () => {},
  file,
}) => {
  const props: UploadProps = {
    defaultFileList: file ? [file] : [],
    name: "file",
    maxCount: 1,
    showUploadList: true,
    multiple: false,
    beforeUpload: () => false,
    accept: acceptedFileTypes?.join(", "),
    onChange: (info) => {
      if (info.file.status === "done" || info.file.status === undefined) {
        console.log(info.file);
        onChange(info.file); // Pass the original file object
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      onChange(e.dataTransfer.files[0]); // Pass the original file object
    },
    onRemove() {
      onChange(undefined);
    },
  };

  return (
    <Dragger {...props}>
      <div className="p-8">
        <p className="flex items-center justify-center mb-4">
          <IoAdd size={24} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single file upload. Accepts{" "}
          {acceptedFileTypes.join(", ")}.
        </p>
      </div>
    </Dragger>
  );
};

export default Upload;
