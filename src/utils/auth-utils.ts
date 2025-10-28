import widgetService from "../services/widget-service";

export function redirectToTim() {
  window.location.assign(`${window._env_.TIM_AUTHENTICATION_URL}?callback_url=${encodeURIComponent(window.location.href)}`);
}

export async function redirectIfComeBackFromTim(callback: any) {
  await widgetService.authenticateUser();
  callback();
}
