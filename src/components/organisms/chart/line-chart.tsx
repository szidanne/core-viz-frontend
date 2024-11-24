import React, { useEffect, useMemo, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { useTheme } from "@/context/theme-context";
import { sortByDate } from "@/utils/general";

interface Props {
  data: any[];
  dataKeys: DataKey[];
}

const LineChart: React.FC<Props> = ({ data, dataKeys }) => {
  const { theme } = useTheme();
  const chartContainer = useRef<HTMLDivElement>(null);

  const { yField, xField } = useMemo(() => {
    const mapTypeToConfig = Object.fromEntries(
      dataKeys.map((config) => [config.type, config]),
    );
    return { xField: mapTypeToConfig.x.key, yField: mapTypeToConfig.y.key };
  }, [dataKeys]);

  useEffect(() => {
    if (theme === "dark") {
      am4core.useTheme(am4themes_dark);
    } else {
      am4core.unuseTheme(am4themes_dark);
    }

    const chart = am4core.create(chartContainer.current!, am4charts.XYChart);

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

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = yField;
    if (xDataKey?.dataType === "date") {
      series.dataFields.dateX = xField;
      series.tooltipText = "{dateX}: [bold]{valueY}[/]";
    } else {
      series.dataFields.categoryX = xField;
      series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    }

    series.strokeWidth = 2;

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;

    chart.data =
      xDataKey?.dataType === "date" ? sortByDate(data, xDataKey?.key) : data;

    return () => chart.dispose();
  }, [data, xField, yField, theme]);

  return (
    <div ref={chartContainer} style={{ width: "100%", height: "400px" }} />
  );
};

export default LineChart;
