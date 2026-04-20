import { useEffect, useState } from "react";
import type { TabType } from "../Types/Tabs";
import { TAB_NAMES, TABS_CONFIG } from "../Types/Tabs";

const STORAGE_KEY = "menu.activeTab";

const isValidTab = (value: string | null): value is TabType =>
  value !== null && (TAB_NAMES as string[]).includes(value);

const getInitialTab = (): TabType => {
  if (typeof window === "undefined") return TAB_NAMES[0];
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isValidTab(saved) ? saved : TAB_NAMES[0];
};

export const useMenuNavigation = () => {
  const [activeTab, setActiveTabState] = useState<TabType>(getInitialTab);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, activeTab);
  }, [activeTab]);

  const setActiveTab = (tab: TabType) => setActiveTabState(tab);

  const config = TABS_CONFIG[activeTab as string];

  return {
    activeTab,
    setActiveTab,
    currentHeaderTitle: config.title,
    ActiveComponent: config.component,
  };
};
