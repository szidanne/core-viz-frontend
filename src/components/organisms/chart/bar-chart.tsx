import React, { useEffect, useMemo, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { useTheme } from "@/context/theme-context";

interface Props {
  data: any[];
  dataKeys: DataKey[];
}

const BarChart: React.FC<Props> = ({ data, dataKeys }) => {
  const { theme } = useTheme();
  const chartContainer = useRef<HTMLDivElement>(null);

  // Extract the xField and yField from dataKeys using useMemo to prevent unnecessary re-renders
  const { xField, yField } = useMemo(() => {
    const mapTypeToConfig = Object.fromEntries(
      dataKeys.map((config) => [config.type, config]),
    );
    return { xField: mapTypeToConfig.x.key, yField: mapTypeToConfig.y.key };
  }, [dataKeys]);

  useEffect(() => {
    // Apply the dark theme if needed
    if (theme === "dark") {
      am4core.useTheme(am4themes_dark);
    } else {
      am4core.unuseTheme(am4themes_dark);
    }

    const chart = am4core.create(chartContainer.current!, am4charts.XYChart);
    chart.data = data;

    const xDataKey = dataKeys.find((config) => config.type === "x");
    if (xDataKey)
      if (xDataKey.dataType === "date") {
        const xAxis = chart.xAxes.push(new am4charts.DateAxis());
        xAxis.dataFields.date = xField; // For CategoryAxis, or date for DateAxis
        xAxis.title.text = xDataKey.label;
      } else {
        const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = xField; // For CategoryAxis, or date for DateAxis
        xAxis.title.text = xDataKey.label;
      }

    const yDataKey = dataKeys.find((config) => config.type === "y");
    if (yDataKey) {
      const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.title.text = yDataKey.label;
    }

    // Create the bar series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = yField;
    if (xDataKey?.dataType === "date") {
      series.dataFields.dateX = xField;
      series.columns.template.tooltipText = "{dateX}: [bold]{valueY}[/]";
    } else {
      series.dataFields.categoryX = xField;
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    }

    return () => chart.dispose();
  }, [data, xField, yField, theme, dataKeys]);

  return (
    <div ref={chartContainer} style={{ width: "100%", height: "400px" }} />
  );
};

export default BarChart;
