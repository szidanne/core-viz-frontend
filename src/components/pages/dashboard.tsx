import React from "react";
import { useDashboardContext } from "@/context/dashboard-context";
import Typography from "@/components/atoms/typography";
import ChartPreview from "@/components/organisms/chart/chart-preview";

const Dashboard = () => {
  const { charts } = useDashboardContext();
  return (
    <div className="flex flex-col gap-8">
      <Typography size="large" weight="medium">
        Dashboard
      </Typography>
      <div className="grid grid-cols-2 gap-20">
        {charts?.map((chart) => <ChartPreview {...chart} key={chart.id} />)}
      </div>
    </div>
  );
};

export default Dashboard;
