import { IconType } from "react-icons";
import { LuBarChart3, LuLineChart, LuPieChart } from "react-icons/lu";
import { FormInput } from "@/typings/components/form";

export const CHART_TYPES: { type: ChartType; label: string; icon: IconType }[] =
  [
    { type: "bar", label: "Bar chart", icon: LuBarChart3 },
    { type: "line", label: "Line chart", icon: LuLineChart },
    { type: "pie", label: "Pie chart", icon: LuPieChart },
  ];

const basicForm: FormInput[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter title",
  },
  {
    id: "caption",
    label: "Caption",
    type: "text",
    placeholder: "Enter caption",
  },
];

export const generateFormInputs = (
  axesOptions: FileData["columns"],
  chartType: ChartType,
): FormInput[] => {
  const getXFieldOptions = () =>
    axesOptions
      .filter(({ type: columnType }) => ["date", "text"].includes(columnType))
      .map(({ key }) => ({ label: key, value: key }));

  const getYFieldOptions = () =>
    axesOptions
      .filter(({ type: columnType }) => ["number"].includes(columnType))
      .map(({ key }) => ({ label: key, value: key }));

  const formInput: { [key in ChartType]: FormInput[] } = {
    pie: [
      ...basicForm,
      {
        id: "xField",
        label: "X-axis column",
        options: getXFieldOptions(),
        type: "select",
        placeholder: "Select X-axis column",
      },
      {
        id: "yField",
        label: "Y-axis column",
        options: getYFieldOptions(),
        type: "select",
        placeholder: "Select Y-axis column",
      },
    ],
    line: [
      ...basicForm,
      {
        id: "xField",
        label: "X-axis column",
        options: getXFieldOptions(),
        type: "select",
        placeholder: "Select X-axis column",
      },
      {
        id: "yField",
        label: "Y-axis column",
        options: getYFieldOptions(),
        type: "select",
        placeholder: "Select Y-axis column",
      },
    ],
    bar: [
      ...basicForm,
      {
        id: "xField",
        label: "X-axis column",
        options: getXFieldOptions(),
        type: "select",
        placeholder: "Select X-axis column",
      },
      {
        id: "yField",
        label: "Y-axis column",
        options: getYFieldOptions(),
        type: "select",
        placeholder: "Select Y-axis column",
      },
    ],
  };

  return formInput[chartType];
};
