import { Trash2 } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import type { CarListItem as CarListItemType } from "../Types/Cars.types";

interface CarListItemProps {
  car: CarListItemType;
  onClick: () => void;
  onDeleteRequest: (car: CarListItemType) => void;
}

const AVATAR_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];
const getBrandColor = (brand: string) => AVATAR_COLORS[brand.charCodeAt(0) % AVATAR_COLORS.length];

const STATUS_STYLES: Record<string, string> = {
  Inventario: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  Vendido: "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300",
  Apartado: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
};
const getStatusStyle = (status: string) =>
  STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300";

const SWIPE_THRESHOLD = 80;

const formatPrice = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return "—";
  const cleaned = typeof value === "string" ? value.replace(/[^0-9.-]/g, "") : value;
  const n = Number(cleaned);
  return Number.isNaN(n) ? "—" : n.toLocaleString("es-MX", { minimumFractionDigits: 2 });
};

export const CarListItem: React.FC<CarListItemProps> = ({ car, onClick, onDeleteRequest }) => {
  const [swipeX, setSwipeX] = useState(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    if (delta < 0) setSwipeX(Math.max(delta, -(SWIPE_THRESHOLD + 20)));
  };
  const handleTouchEnd = () => {
    if (swipeX <= -SWIPE_THRESHOLD) onDeleteRequest(car);
    setSwipeX(0);
  };

  const avatarColor = getBrandColor(car.brand);
  const brandInitial = car.brand.charAt(0).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-y-0 right-0 w-24 bg-red-500 dark:bg-red-600 flex items-center justify-center rounded-2xl">
        <Trash2 className="text-white" size={22} />
      </div>

      <div
        role="button"
        tabIndex={0}
        style={{
          transform: `translateX(${swipeX}px)`,
          transition: swipeX === 0 ? "transform 0.2s ease" : "none",
        }}
        className="relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm rounded-2xl cursor-pointer active:scale-[0.99] transition-colors"
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center gap-3 p-4">
          <div
            className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm"
            style={{ backgroundColor: avatarColor }}
          >
            <span className="text-white font-black text-base">{brandInitial}</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">
              {car.brand} {car.model}
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">{car.year_of_car}</p>
            <span
              className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusStyle(car.status)}`}
            >
              {car.status}
            </span>
          </div>

          <div className="text-right flex-shrink-0 space-y-0.5">
            <div>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Compra</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-300">${formatPrice(car.purchase_price)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Venta</p>
              <p className="text-sm font-black text-slate-700 dark:text-slate-100">${formatPrice(car.price_for_sale)}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDeleteRequest(car); }}
            className="hidden sm:flex p-2 rounded-full text-gray-200 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-950/40 transition-colors ml-1"
            aria-label="Eliminar vehículo"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
