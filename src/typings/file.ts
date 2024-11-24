type ColumnType = {
  key: string;
  title: string;
  dataIndex: string;
  fixed?: "left";
  width: number;
  type: "text" | "number" | "date" | "boolean" | "unknown";
};

interface FileData {
  dataSource: any[];
  columns: ColumnType[];
}
