import { Trash2 } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CarListItem as CarListItemType } from "../Types/Cars.types";

interface CarListItemProps {
  car: CarListItemType;
  onClick: () => void;
  onDeleteRequest: (car: CarListItemType) => void;
}

const AVATAR_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];
const getBrandColor = (brand: string) => AVATAR_COLORS[brand.charCodeAt(0) % AVATAR_COLORS.length];

const STATUS_STYLES: Record<string, string> = {
  Inventario: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-transparent",
  Vendido:
    "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300 border-transparent",
  Apartado:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-transparent",
  "En espera":
    "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-transparent",
  Reparacion: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-transparent",
};

const SWIPE_THRESHOLD = 80;

const formatPrice = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return "—";
  const cleaned = typeof value === "string" ? value.replace(/[^0-9.-]/g, "") : value;
  const n = Number(cleaned);
  return Number.isNaN(n) ? "—" : n.toLocaleString("es-MX", { minimumFractionDigits: 0 });
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
      {/* Swipe-to-delete background */}
      <div className="absolute inset-y-0 right-0 flex w-20 items-center justify-center rounded-2xl bg-red-500 dark:bg-red-600">
        <Trash2 className="text-white" size={20} />
      </div>

      {/* Swipe wrapper — role="none" keeps gesture handler off interactive AT tree */}
      <div
        role="none"
        style={{
          transform: `translateX(${swipeX}px)`,
          transition: swipeX === 0 ? "transform 0.2s ease" : "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Card className="rounded-2xl border-border p-0">
          <div className="relative flex items-center gap-3 p-3.5">
            {/* Stretched button — semantic click + keyboard target */}
            <button
              type="button"
              onClick={onClick}
              className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              aria-label={`${car.brand} ${car.model}, ${car.year_of_car}`}
            />
            Avatar
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full shadow-sm"
              style={{ backgroundColor: avatarColor }}
            >
              <span className="text-sm font-black text-white">{brandInitial}</span>
            </div>
            {/* Brand / model / year / status */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">
                {car.brand} {car.model}
              </p>
              <p className="text-xs text-muted-foreground">{car.year_of_car}</p>
              <Badge
                variant="secondary"
                className={cn("mt-1 px-1.5 py-0 text-[10px]", STATUS_STYLES[car.status])}
              >
                {car.status}
              </Badge>
            </div>
            {/* Prices — inversión + venta (base queda en tabla desktop) */}
            <div className="shrink-0 text-right">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                  Inversión
                </p>
                <p className="text-xs font-bold text-foreground">
                  ${formatPrice(car.purchase_price)}
                </p>
              </div>
              <div className="mt-1">
                <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                  Venta
                </p>
                <p className="text-sm font-black text-foreground">
                  ${formatPrice(car.price_for_sale)}
                </p>
              </div>
            </div>
            {/* Desktop delete — z-10 floats above stretched button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative z-10 hidden size-8 text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40 dark:hover:text-red-400 sm:flex"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteRequest(car);
              }}
              aria-label="Eliminar vehículo"
            >
              <Trash2 size={15} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
