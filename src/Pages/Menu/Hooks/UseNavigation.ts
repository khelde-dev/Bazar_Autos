import { useState } from "react";
import { TABS_CONFIG, type TabType } from "../Types/Tabs";

export const useMenuNavigation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Compra");

  const currentHeaderTitle = TABS_CONFIG[activeTab].title;
  const ActiveComponent = TABS_CONFIG[activeTab].component;

  return {
    activeTab,
    setActiveTab,
    currentHeaderTitle,
    ActiveComponent
  };
};