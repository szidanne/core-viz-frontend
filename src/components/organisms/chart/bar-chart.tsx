import React, { useEffect, useMemo, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

interface Props {
  data: any[];
  dataKeys: DataKey[];
}

const BarChart: React.FC<Props> = ({ data, dataKeys }) => {
  const chartContainer = useRef<HTMLDivElement>(null);

  // Extract xField and yField from dataKeys using useMemo to prevent unnecessary re-renders
  const { xField, yField } = useMemo(() => {
    const mapTypeToConfig = Object.fromEntries(
      dataKeys.map((config) => [config.type, config]),
    );
    return { xField: mapTypeToConfig.x.key, yField: mapTypeToConfig.y.key };
  }, [dataKeys]);

  useEffect(() => {
    const chart = am4core.create(chartContainer.current!, am4charts.XYChart);

    // Handle x-axis configuration
    const xDataKey = dataKeys.find((config) => config.type === "x");
    let xAxis: am4charts.Axis;
    if (xDataKey?.dataType === "date") {
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dataFields.date = xField;
      xAxis = dateAxis;
    } else {
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = xField;
      xAxis = categoryAxis;
    }
    xAxis.title.text = xDataKey?.label ?? xDataKey?.key ?? "";

    // Handle y-axis configuration
    const yDataKey = dataKeys.find((config) => config.type === "y");
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = yDataKey?.label ?? yDataKey?.key ?? "";

    // Create the bar series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = yField;

    if (xDataKey?.dataType === "date") {
      series.dataFields.dateX = xField;
      series.columns.template.tooltipText =
        "{dateX.formatDate('yyyy-MM-dd')}: [bold]{valueY}[/]";
    } else {
      series.dataFields.categoryX = xField;
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    }

    // Add scrollbars for panning/zooming
    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    // Set data and initial zoom
    chart.data = data;

    // Initial zoom for the first 20 data points
    chart.events.on("ready", () => {
      if (xDataKey?.dataType === "date") {
        const firstDate = new Date(chart.data[0][xField]);
        const twentiethDate = new Date(
          chart.data[Math.min(19, chart.data.length - 1)][xField],
        );
        (xAxis as am4charts.DateAxis).zoomToDates(firstDate, twentiethDate);
      } else {
        (xAxis as am4charts.CategoryAxis).start = 0;
        (xAxis as am4charts.CategoryAxis).end =
          Math.min(20, chart.data.length) / chart.data.length;
      }
    });

    return () => chart.dispose();
  }, [data, xField, yField, dataKeys]);

  return (
    <div ref={chartContainer} style={{ width: "100%", height: "400px" }} />
  );
};

export default BarChart;
