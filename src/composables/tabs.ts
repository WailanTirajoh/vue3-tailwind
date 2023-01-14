import { ref } from "vue";
import type { Tab, TabChildren } from "../type";
const tabs = ref<{
  [key: string]: Tab;
}>({});
export const useTabs = () => {
  function addTabs(id: string) {
    tabs.value[id] = {
      active: 0,
      childrens: [],
    };
  }

  function getTab(id: string) {
    if (!Object.keys(tabs.value).includes(id)) return {};
    return tabs.value[id];
  }

  function addTabChildren(tabId: string, children: TabChildren) {
    tabs.value[tabId].childrens.push(children);
  }

  function setTabActive(tabId: string, active: TabChildren) {
    tabs.value[tabId].active = active;
  }

  return {
    tabs,
    addTabs,
    addTabChildren,
    setTabActive,
    getTab,
  };
};
