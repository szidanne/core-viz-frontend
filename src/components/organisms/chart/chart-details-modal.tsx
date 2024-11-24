import React from "react";
import { Modal, Button } from "antd";
import ChartPreview from "@/components/organisms/chart/chart-preview";

interface ChartDetailsModalProps {
  visible: boolean;
  chart: any;
  onClose: () => void;
  onDelete: () => void;
}

const ChartDetailsModal: React.FC<ChartDetailsModalProps> = ({
  visible,
  chart,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      title="Chart Details"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
        <Button key="delete" danger onClick={onDelete}>
          Delete Chart
        </Button>,
      ]}
    >
      {chart && (
        <div>
          <ChartPreview {...chart} />
        </div>
      )}
    </Modal>
  );
};

export default ChartDetailsModal;
