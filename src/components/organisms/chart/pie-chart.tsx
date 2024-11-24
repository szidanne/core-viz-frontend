import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper";
import { Form, InputNumber } from "antd";

interface Props {
  data: any[];
  dataKeys: DataKey[];
}

const PieChart: React.FC<Props> = ({ data, dataKeys }) => {
  const chartContainer = useRef<HTMLDivElement>(null);

  const [threshold, setThreshold] = useState<number>(1);

  const { yField, xField } = useMemo(() => {
    const mapTypeToConfig = Object.fromEntries(
      dataKeys.map((config) => [config.type, config]),
    );
    return { xField: mapTypeToConfig.x.key, yField: mapTypeToConfig.y.key };
  }, [dataKeys]);

  useLayoutEffect(() => {
    const chart = am4core.create(chartContainer.current!, am4charts.PieChart);

    chart.data = data;

    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = yField;
    series.dataFields.category = xField;
    series.slices.template.tooltipText =
      "{category}: [bold]{value.percent.formatNumber('#.0')}% ({value})[/]";

    // If there are more than 15 slices, group the smaller slices under "Other"
    const grouper = series.plugins.push(
      new am4plugins_sliceGrouper.SliceGrouper(),
    );

    // Only apply the grouper if there are more than 15 slices
    if (data.length > 15) {
      // Group slices smaller than thresholdValue into "Other"
      grouper.threshold = threshold;
      grouper.groupName = "Other"; // Name of the group
      grouper.clickBehavior = "break"; // Expand "Other" when clicked
    }

    return () => chart.dispose();
  }, [data, xField, yField, threshold]);

  return (
    <div className="flex flex-col gap-4 items-end">
      <Form.Item label="Group threshold">
        <InputNumber
          placeholder="Threshold"
          defaultValue={1}
          onChange={(value) => setThreshold(value as number)}
          suffix="%"
        />
      </Form.Item>
      <div ref={chartContainer} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default PieChart;
