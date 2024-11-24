import React, { useEffect, useMemo, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { useTheme } from "@/context/theme-context";

interface Props {
  data: any[];
  dataKeys: DataKey[];
}

const PieChart: React.FC<Props> = ({ data, dataKeys }) => {
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

    const chart = am4core.create(chartContainer.current!, am4charts.PieChart);
    chart.data = data;

    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = yField;
    series.dataFields.category = xField;
    series.slices.template.tooltipText =
      "{category}: [bold]{value.percent.formatNumber('#.0')}% ({value})[/]";

    return () => chart.dispose();
  }, [data, xField, yField, theme]);

  return (
    <div ref={chartContainer} style={{ width: "100%", height: "400px" }} />
  );
};

export default PieChart;
