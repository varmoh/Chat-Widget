import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { authSmaxUser, getUserinfo } from "../slices/authentication-slice";
import useAuthenticationSelector from "./use-authentication-selector";
import { redirectIfComeBackFromTim } from "../utils/auth-utils";
import authenticationService from "../services/authentication-service";
import { setIsChatOpen } from "../slices/chat-slice";

const useAuthentication = (): void => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, fetchingUserInfo, loggedInWithTaraJwt } =
    useAuthenticationSelector();

  useEffect(() => {
    const cookieFound = authenticationService.hasCookie();
    if (cookieFound) {
      dispatch(getUserinfo());
    }
  }, []);

  useEffect(() => {
    redirectIfComeBackFromTim(() => {
      dispatch(getUserinfo());
    });

    if (!isAuthenticated || loggedInWithTaraJwt) {
      dispatch(getUserinfo());
    }
  }, [isAuthenticated, loggedInWithTaraJwt]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("auth_code");
    const lastCode = sessionStorage.getItem("last_auth_code");

    const shouldReauthenticate =
      code && window._env_?.SMAX_INTEGRATION?.enabled && code !== lastCode;

    if (shouldReauthenticate) {
      dispatch(authSmaxUser(code)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          sessionStorage.setItem("last_auth_code", code);
          dispatch(setIsChatOpen(true));
        } else {
          console.error("Failed to authenticate with SMAX");
        }
      });
    }
  }, []);
};

export default useAuthentication;
