import type React from "react";
import { Header } from "../../Utils/Screen/Header/Header";
import { useMenuNavigation } from "./Hooks/UseNavigation";
import { TAB_NAMES } from "./Types/Tabs";

export const Menu: React.FC = () => {
  const { activeTab, setActiveTab, currentHeaderTitle, ActiveComponent } =
    useMenuNavigation();

  return (
    <>
      <main className="w-full max-w-md mt-10 space-y-6">
        <Header Title={currentHeaderTitle} />
        <section>
          <div className="bg-gray-200/50 p-1.5 rounded-2xl flex gap-1">
            {TAB_NAMES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {ActiveComponent}
        </section>
      </main>
    </>
  );
};
