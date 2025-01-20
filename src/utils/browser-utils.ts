import {CHAT_SESSIONS} from "../constants";

export const isLastSession = (): boolean => {
  const currentState = JSON.parse(localStorage.getItem(CHAT_SESSIONS.SESSION_STATE_KEY) as string) || { ids: [], count: 0 };
  return currentState.count <= 1;
}

export const wasPageReloaded = () => {
  return window.performance
    .getEntriesByType('navigation')
    .map((nav) => (nav as PerformanceNavigationTiming).type)
    .includes('reload');
}

export const isChatAboutToBeTerminated = () => {
  const terminationTime = sessionStorage.getItem('terminationTime');

  if(!terminationTime)
    return false;

  return 4000 > (Date.now() - parseInt(terminationTime));
}
