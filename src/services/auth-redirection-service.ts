import { SESSION_STORAGE_TARA_LOGIN_REDIRECT } from "../constants";

class AuthRedirectionService {
  redirectToTim () {
    this.saveCurrentPathAsReidrectPath();
    window.location.assign(window._env_.TIM_AUTHENTICATION_URL);
  }

  redirectIfComeBackFromTim () {
    const redirectPath = this.getRedirectPath();
    if (!!redirectPath) {
      this.removeRedirectPath();
      window.location.href = window.location.origin + redirectPath;
    }
  }

  saveCurrentPathAsReidrectPath () {
    sessionStorage.setItem(SESSION_STORAGE_TARA_LOGIN_REDIRECT, window.location.pathname);
  }

  getRedirectPath () {
   return sessionStorage.getItem(SESSION_STORAGE_TARA_LOGIN_REDIRECT);
  }

  isRedirectPathSet () {
    return !!this.getRedirectPath();
  }

  isRedirectPathEmpty () {
    return !this.isRedirectPathSet();
  }
  
  removeRedirectPath () {
    sessionStorage.removeItem(SESSION_STORAGE_TARA_LOGIN_REDIRECT);
  }
}

export default new AuthRedirectionService();
