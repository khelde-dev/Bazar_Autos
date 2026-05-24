import { ArrowRightLeft } from "lucide-react";
import type { Investment } from "../Types/Investments.types";
import { formatMoney, formatShortDate } from "../Utils/format";

interface InvestmentItemProps {
  investment: Investment;
  onOpenHistory: (investorId: string) => void;
  onAddTransaction: (investorId: string, amount: string) => void;
}

export const InvestmentItem = ({
  investment,
  onOpenHistory,
  onAddTransaction,
}: InvestmentItemProps) => {
  const shortId = investment.investor_id.slice(0, 8);
  const amount = formatMoney(investment.investment_amount);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-3">
      <button
        type="button"
        onClick={() => onOpenHistory(investment.investor_id)}
        aria-label={`Ver historial de inversión ${amount}, registrada el ${formatShortDate(investment.created)}`}
        className="flex-1 flex items-center gap-3 text-left active:scale-[0.99] transition-all min-w-0"
      >
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-gray-400 dark:text-gray-500">
            {formatShortDate(investment.created)}
          </div>
          <div className="mt-1 text-lg font-black text-blue-600 truncate">{amount}</div>
          <div className="text-[10px] text-gray-400 font-mono truncate">#{shortId}</div>
        </div>
      </button>

      <div className="flex shrink-0">
        <button
          type="button"
          onClick={() => onAddTransaction(investment.investor_id, investment.investment_amount)}
          className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 active:scale-95 transition-all"
          aria-label={`Registrar transacción para inversión ${amount}`}
          title="Registrar transacción"
        >
          <ArrowRightLeft size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
