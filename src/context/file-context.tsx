import React, { createContext, useContext, useState, useEffect } from "react";
import parseFile from "@/utils/file-parser";

type FileContextType = {
  file?: File;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  fileData?: FileData;
  setFileData: React.Dispatch<React.SetStateAction<FileData | undefined>>;
};

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};

export const FileProvider: React.FC<Template> = ({ children }) => {
  const [file, setFile] = useState<File | undefined>();
  const [fileData, setFileData] = useState<FileData | undefined>();

  useEffect(() => {
    if (file) {
      parseFile(file).then((r) => {
        const dataSource = r.map((row: any, idx: number) => ({
          ...row,
          key: idx,
        }));
        const columns = Object.keys(r[0]).map((key, idx) => ({
          key,
          title: key,
          dataIndex: key,
          fixed: idx <= 1 ? "left" : undefined,
          width: 250,
        }));
        setFileData({ dataSource, columns });
      });
    } else {
      setFileData(undefined);
    }
  }, [file]);

  return (
    <FileContext.Provider value={{ file, setFile, fileData, setFileData }}>
      {children}
    </FileContext.Provider>
  );
};
