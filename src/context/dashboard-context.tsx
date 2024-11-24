import React, { createContext, useContext, useState } from "react";
import { Form, FormInstance } from "antd";

type DashboardContextType = {
  charts?: DashboardChart[];
  setCharts: React.Dispatch<React.SetStateAction<DashboardChart[]>>;
  form: FormInstance;
  removeChart: (id: string) => void;
  clearDashboard: () => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useFile must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider: React.FC<Template> = ({ children }) => {
  const [form] = Form.useForm();
  const [charts, setCharts] = useState<DashboardChart[]>([]);

  const clearDashboard = () => setCharts([]);

  const removeChart = (id: string) =>
    setCharts((prevState) => prevState.filter((chart) => id !== chart.id));

  return (
    <DashboardContext.Provider
      value={{ charts, setCharts, form, clearDashboard, removeChart }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
