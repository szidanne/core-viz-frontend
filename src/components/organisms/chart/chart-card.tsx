import React, { useMemo } from "react";
import { Badge, Tooltip } from "antd";
import { CHART_TYPES } from "@/static/chart-configs";
import RoundedButton from "@/components/atoms/rounded-button";
import { FaMinus } from "react-icons/fa";

interface ChartCardProps {
  chart: DashboardChart;
  onShowDetails: () => void;
  onDelete: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({
  chart,
  onShowDetails,
  onDelete,
}) => {
  const { icon: Icon, label } = useMemo(() => {
    return (
      CHART_TYPES.find(({ type }) => type === chart.chartType) ?? {
        icon: undefined,
        label: undefined,
      }
    );
  }, [chart.chartType]);

  return (
    <Badge
      size="default"
      color="red"
      count={
        <Tooltip title="Remove">
          <RoundedButton
            size="small"
            className="bg-error"
            icon={<FaMinus size={9} />}
            onClick={onDelete}
          />
        </Tooltip>
      }
    >
      <RoundedButton
        icon={Icon && <Icon />}
        tooltip={`${label} - click for details`}
        onClick={onShowDetails}
      />
    </Badge>
  );
};

export default ChartCard;
