import React, { lazy, Suspense, useEffect } from "react";
import { Spin } from "antd";
import Typography from "@/components/atoms/typography";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4core from "@amcharts/amcharts4/core";
import { useTheme } from "@/context/theme-context";

const BarChart = lazy(() => import("@/components/organisms/chart/bar-chart"));
const LineChart = lazy(() => import("@/components/organisms/chart/line-chart"));
const PieChart = lazy(() => import("@/components/organisms/chart/pie-chart"));
am4core.useTheme(am4themes_animated);

const ChartPreview: React.FC<DashboardChart> = ({
  data,
  chartType,
  dataKeys,
  title = "Title",
  caption = "Description",
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === "dark") {
      am4core.useTheme(am4themes_dark);
    } else {
      am4core.unuseTheme(am4themes_dark);
    }
  }, [theme]);

  if (!data || data.length === 0) {
    return (
      <Typography className="text-center">
        No data available for the selected fields.
      </Typography>
    );
  }

  if (dataKeys.length === 0) {
    return (
      <Typography className="text-center">
        Please select all necessary fields
      </Typography>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <BarChart data={data} dataKeys={dataKeys} />;
      case "line":
        return <LineChart data={data} dataKeys={dataKeys} />;
      case "pie":
        return <PieChart data={data} dataKeys={dataKeys} />;
      default:
        return (
          <p style={{ textAlign: "center", color: "gray" }}>
            Unsupported chart type selected.
          </p>
        );
    }
  };

  return (
    <Suspense fallback={<Spin />}>
      <div className="flex flex-col gap-2">
        <Typography size="2xl" weight="medium">
          {title}
        </Typography>
        <Typography className="mb-6">{caption}</Typography>
        {renderChart()}
      </div>
    </Suspense>
  );
};

export default ChartPreview;
