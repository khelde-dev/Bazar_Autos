import { Loader2 } from "lucide-react";
import type React from "react";
import { Header } from "../../Utils/Screen/Header/Header";
import { useMenuNavigation } from "./Hooks/UseNavigation";
import { useUserProfile } from "./Hooks/UserProfile";
import { TAB_NAMES, TABS_CONFIG } from "./Types/Tabs";

const INVESTOR_USER_ID = "f272776e-7033-44c4-82de-f7c668f17cf0";

export const Menu: React.FC = () => {
  const { activeTab, setActiveTab } = useMenuNavigation();

  const { data: user, isLoading } = useUserProfile();

  const isInvestor = !isLoading && user?.data?.[0]?.user_id === INVESTOR_USER_ID;
  const visibleTabs = TAB_NAMES.filter((tab) => tab !== "Inversionista" || isInvestor);
  const effectiveTab = visibleTabs.includes(activeTab) ? activeTab : visibleTabs[0];
  const currentHeaderTitle = TABS_CONFIG[effectiveTab].title;

  return (
    <main className="w-full max-w-md space-y-6">
      {isLoading ? (
        <Loader2 size={14} className="animate-spin text-blue-600 opacity-90" strokeWidth={3} />
      ) : (
        <Header Title={currentHeaderTitle} user={user.data[0].username} />
      )}

      <section className="px-4">
        <div className="bg-gray-200 dark:bg-slate-800 p-1.5 rounded-2xl flex gap-1">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                effectiveTab === tab
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {visibleTabs.map((tabName) => {
          const TabComponent = TABS_CONFIG[tabName].component;
          return (
            <div key={tabName} className={effectiveTab === tabName ? "block" : "hidden"}>
              <TabComponent />
            </div>
          );
        })}
      </section>
    </main>
  );
};
