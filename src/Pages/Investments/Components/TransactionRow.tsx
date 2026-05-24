import { MinusCircle, PlusCircle } from "lucide-react";
import type { Transaction } from "../Types/Investments.types";
import { formatDateTime } from "../Utils/format";

interface TransactionRowProps {
  tx: Transaction;
}

export const TransactionRow = ({ tx }: TransactionRowProps) => {
  const isIn = tx.type === "Entrada";
  const colorClasses = isIn
    ? { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400" }
    : { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400" };

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-3"
      aria-label={`Transacción: ${tx.concept}, ${tx.type}, ${tx.amount}`}
    >
      <div className={`p-2 rounded-xl ${colorClasses.bg} ${colorClasses.text}`} aria-hidden="true">
        {isIn ? (
          <PlusCircle size={22} strokeWidth={2.5} />
        ) : (
          <MinusCircle size={22} strokeWidth={2.5} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
          {tx.concept}
        </div>
        <div className={`text-[11px] font-semibold mt-0.5 ${colorClasses.text}`}>{tx.type}</div>
        <div className="text-[10px] text-gray-400 mt-0.5">{formatDateTime(tx.created)}</div>
      </div>

      <div
        className={`text-sm font-black ${colorClasses.text} shrink-0`}
        aria-label={`Monto: ${isIn ? "+" : "-"}${tx.amount}`}
      >
        {isIn ? "+" : "-"}
        {tx.amount}
      </div>
    </article>
  );
};
