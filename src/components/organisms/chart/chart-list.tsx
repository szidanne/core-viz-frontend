// components/organisms/ch
import React from "react";
import ChartCard from "@/components/organisms/chart/chart-card";
import Typography from "@/components/atoms/typography";

interface ChartListProps {
  charts: any[];
  onShowDetails: (chart: DashboardChart) => void;
  onDelete: (id: string) => void;
}

const ChartList: React.FC<ChartListProps> = ({
  charts,
  onShowDetails,
  onDelete,
}) => {
  return (
    <div className="flex gap-6 flex-wrap">
      {charts && charts.length > 0 ? (
        charts.map((chart, index) => (
          <ChartCard
            key={index}
            chart={chart}
            onShowDetails={() => onShowDetails(chart)}
            onDelete={() => onDelete(chart.id)}
          />
        ))
      ) : (
        <Typography size="xs">No charts yet, let's add something!</Typography>
      )}
    </div>
  );
};

export default ChartList;
