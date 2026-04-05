import type React from "react";
import { Header } from "../../Utils/Screen/Header/Header";
import { useMenuNavigation } from "./Hooks/UseNavigation";
import { TAB_NAMES, TABS_CONFIG } from "./Types/Tabs";
import { useUserProfile } from "./Hooks/UserProfile";
import { Loader2 } from "lucide-react";

export const Menu: React.FC = () => {
  const { activeTab, setActiveTab, currentHeaderTitle } = useMenuNavigation();

  const { data: user, isLoading } = useUserProfile();

  return (
    <main className="w-full max-w-md space-y-6">
      {isLoading ? (
        <Loader2
          size={14}
          className="animate-spin text-blue-600 opacity-90"
          strokeWidth={3}
        />
      ) : (
        <Header Title={currentHeaderTitle} user={user.data[0].username} />
      )}

      <section className="px-4">
        <div className="bg-gray-200 p-1.5 rounded-2xl flex gap-1">
          {TAB_NAMES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {TAB_NAMES.map((tabName) => {
          const TabComponent = TABS_CONFIG[tabName].component;
          return (
            <div
              key={tabName}
              className={activeTab === tabName ? "block" : "hidden"}
            >
              <TabComponent />
            </div>
          );
        })}
      </section>
    </main>
  );
};
