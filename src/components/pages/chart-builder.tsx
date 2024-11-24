import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Radio, Tooltip, Divider } from "antd";
import { useFileContext } from "@/context/file-context";
import { useDashboardContext } from "@/context/dashboard-context";
import { CHART_TYPES, generateFormInputs } from "@/static/chart-configs";
import DynamicForm from "@/components/organisms/form";
import RoundedButton from "@/components/atoms/rounded-button";
import ChartDetailsModal from "@/components/organisms/chart/chart-details-modal";
import ChartList from "@/components/organisms/chart/chart-list";
import { uuid } from "uuidv4";
import { parseSnakeCaseToLabel, sortData } from "@/utils/general";
import ChartPreview from "@/components/organisms/chart/chart-preview";
import Typography from "@/components/atoms/typography";
import { FaX } from "react-icons/fa6";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ChartBuilder: React.FC<Props> = ({ setStep }) => {
  const { fileData } = useFileContext();
  const { setCharts, charts, removeChart, clearDashboard, form } =
    useDashboardContext();
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChart, setSelectedChart] = useState<
    DashboardChart | undefined
  >();

  const mapColumnsByKey = useMemo(() => {
    const columns = fileData?.columns ?? [];
    return Object.fromEntries(columns.map((col) => [col.key, col]));
  }, [fileData?.columns]);

  const generateDataKey = useCallback(
    (field: string, axisType: "x" | "y"): DataKey => {
      const column = mapColumnsByKey[field];

      return {
        type: axisType,
        key: field,
        label: parseSnakeCaseToLabel(field) ?? field,
        dataType: column?.type || "",
      };
    },
    [mapColumnsByKey],
  );

  const chartData: Record<string, any>[] = useMemo(() => {
    const data = fileData?.dataSource;
    const { xField, yField } = formValues;
    if (!data) return [] as Record<string, any>[];
    const grouped = data.reduce((acc, curr) => {
      const category = curr[xField];
      const val = curr[yField] * 1;

      const prevVal = (acc[category]?.[yField] ?? 0) * 1;

      return {
        ...acc,
        [category]: { ...curr, [yField]: prevVal + val },
      };
    }, {});
    return sortData(Object.values(grouped), [xField]) as Record<string, any>[];
  }, [fileData?.dataSource, formValues]);

  const currChart = useMemo(() => {
    const id = uuid();
    let dataKeys: DataKey[] = [];
    if (formValues?.xField && formValues?.yField) {
      dataKeys = [
        generateDataKey(formValues?.xField, "x"),
        generateDataKey(formValues?.yField, "y"),
      ];
    }
    return {
      ...formValues,
      chartType,
      data: chartData ?? fileData?.dataSource ?? [],
      id,
      dataKeys,
    };
  }, [
    generateDataKey,
    chartType,
    chartData,
    fileData?.dataSource,
    formValues,
    formValues?.yField,
  ]);

  const showModal = (chart: any) => {
    setSelectedChart(chart);
    setIsModalVisible(true);
  };

  const handleDeleteChart = () => {
    removeChart(selectedChart?.id!);
    setIsModalVisible(false);
  };

  const handleClearDashboard = () => {
    form.resetFields();
    clearDashboard();
  };

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <Typography size="large" weight="medium">
        Dashboard
      </Typography>
      <ChartList
        charts={charts ?? []}
        onShowDetails={showModal}
        onDelete={removeChart}
      />
      <div className="flex justify-end w-full gap-2">
        <RoundedButton
          type="dashed"
          onClick={handleClearDashboard}
          tooltip="Clear dashboard"
          icon={<FaX size={9} />}
        />
        <RoundedButton
          type="primary"
          onClick={() => setStep((prev) => prev + 1)}
        >
          Go to dashboard
        </RoundedButton>
      </div>
      <Divider />
      <Typography size="large" weight="medium">
        Add a new chart
      </Typography>
      <Radio.Group
        className="ml-auto"
        onChange={(e) => setChartType(e.target.value)}
        defaultValue="bar"
      >
        {CHART_TYPES.map(({ type, label, icon: Icon }) => (
          <Radio.Button key={type} value={type}>
            <Tooltip title={label}>
              <div className="items-center justify-center flex h-full">
                <Icon />
              </div>
            </Tooltip>
          </Radio.Button>
        ))}
      </Radio.Group>
      <DynamicForm
        form={form}
        inputs={generateFormInputs(fileData?.columns ?? [], chartType)}
        onValuesChange={(vals) => setFormValues(vals)}
      />
      <div className="flex justify-end w-full">
        <RoundedButton
          type="primary"
          onClick={() => {
            setCharts((prev) => [...prev, currChart]);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          tooltip="Add chart"
        >
          +
        </RoundedButton>
      </div>
      <ChartDetailsModal
        visible={isModalVisible}
        chart={selectedChart}
        onClose={() => setIsModalVisible(false)}
        onDelete={handleDeleteChart}
      />
      <ChartPreview {...currChart} />
    </div>
  );
};

export default ChartBuilder;
