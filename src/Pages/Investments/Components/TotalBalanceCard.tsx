import { Wallet } from "lucide-react";

interface TotalBalanceCardProps {
  amount: number;
  label?: string;
}

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

const formatMoney = (value: number) => mxnFormatter.format(value);

export const TotalBalanceCard = ({
  amount,
  label = "Saldo total actual",
}: TotalBalanceCardProps) => (
  <section className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-600/20">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] font-black uppercase tracking-[2px] text-blue-100">{label}</span>
      <Wallet size={20} className="text-blue-100" />
    </div>
    <div className="text-4xl font-black tracking-tight">{formatMoney(amount)}</div>
  </section>
);
