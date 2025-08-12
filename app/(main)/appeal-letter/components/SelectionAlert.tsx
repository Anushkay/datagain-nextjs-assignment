import ExportIcon from "@/app/icons/ExportIcon";
import { Alert, Button } from "@heroui/react";

export interface SelectionAlertProps {
  message: string;
  onExport: () => void;
  onDownload: () => void;
  onChangeStatus: () => void;
  onClose: () => void;
}

export default function SelectionAlert({
  message,
  onExport,
  onDownload,
  onChangeStatus,
  onClose,
}: SelectionAlertProps) {
  return (
    <Alert
      className="flex flex-nowrap items-center justify-between shadow-lg min-w-[600px] bg-[#F1F8FC] border border-[#CDE7F3] px-4 py-2 gap-4"
      onClose={onClose}
    >


      <div className="flex flex-nowrap items-center gap-2">
              <span className="text-sm font-medium text-[#2D2E34] whitespace-nowrap">
        {message}
      </span>
        <Button
          size="sm"
          variant="bordered"
          className="rounded-sm border-[#A4D4E9] text-[#2D2E34] hover:bg-[#E5F4FA] whitespace-nowrap"
          onPress={onExport}
          startContent={<ExportIcon size={16} />}
        >
          Export Grid Details
        </Button>

        <Button
          size="sm"
          variant="bordered"
          className="rounded-sm border-[#A4D4E9] text-[#2D2E34] hover:bg-[#E5F4FA] whitespace-nowrap"
          onPress={onDownload}
        >
          Download Letter
        </Button>

        <Button
          size="sm"
          className="rounded-sm bg-[#3FC3AC] text-white whitespace-nowrap"
          onPress={onChangeStatus}
        >
          Change Status
        </Button>
      </div>
    </Alert>
  );
}
