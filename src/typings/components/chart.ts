type ChartType = "bar" | "line" | "pie";

interface DataKey {
  type: "x" | "y";
  key: string;
  label: string;
  dataType: string;
}

interface DashboardChart {
  data: Record<string, any>[];
  dataKeys: DataKey[];
  id: string;
  chartType: ChartType;
  title?: string;
  caption?: string;
}
