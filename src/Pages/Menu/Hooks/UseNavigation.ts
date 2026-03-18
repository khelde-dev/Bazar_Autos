import { useState } from "react";
import { TABS_CONFIG } from "../Types/Tabs";
import type { TabType } from "../Types/Tabs";

export const useMenuNavigation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Compra");
  const config = TABS_CONFIG[activeTab as string];

  return {
    activeTab,
    setActiveTab,
    currentHeaderTitle: config.title,
    ActiveComponent: config.component
  };
};