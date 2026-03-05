import type React from "react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { Bookmark } from "lucide-react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { STATUS_OPTIONS, type VehicleStatus } from "../Types/ShooppVehicle.types";


interface StatusProps {
  currentStatus: VehicleStatus;
  onStatusChange: (newStatus: VehicleStatus) => void;
}

export const Status: React.FC<StatusProps> = ({ currentStatus, onStatusChange }) => {
  return (
    <Card>
      <SectionTitle icon={Bookmark} title="Estatus" />
      <div className="flex gap-2 bg-gray-50/50 p-1 rounded-4xl">
        {STATUS_OPTIONS.map((status) => {
          const isActive = currentStatus === status;
          
          return (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
              className={`flex-1 py-3 rounded-full text-xs font-bold transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-[1.02]"
                  : "bg-transparent text-gray-500 hover:text-gray-700 border border-transparent"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>
    </Card>
  );
};