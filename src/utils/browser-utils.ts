import { CHAT_SESSIONS } from "../constants";

export const isLastSession = (): boolean => {
  const currentState = JSON.parse(
    localStorage.getItem(CHAT_SESSIONS.SESSION_STATE_KEY) as string
  ) || { ids: [], count: 0 };
  return currentState.count <= 1;
};

export const wasPageReloaded = () => {
  return window.performance
    .getEntriesByType("navigation")
    .map((nav) => (nav as PerformanceNavigationTiming).type)
    .includes("reload");
};

export const wasPageReloadedNavigate = () => {
  return window.performance.getEntriesByType("navigation").some((nav) => {
    const type = (nav as PerformanceNavigationTiming).type;
    return type === "reload" || type === "navigate";
  });
};

export const isChatAboutToBeTerminated = () => {
  const terminationTime = sessionStorage.getItem("terminationTime");

  if (!terminationTime) return false;

  return 4000 > Date.now() - parseInt(terminationTime);
};

export const isMobileWidth = () => {
  return window.innerWidth < 480;
};

export const isIphone = () => {
  return /iPhone|iPad|iPod/.test(window.navigator.userAgent) && isMobileWidth();
};
