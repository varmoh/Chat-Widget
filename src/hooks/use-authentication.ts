import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { getUserinfo, loginWithTaraJwt, setIsAuthenticated } from '../slices/authentication-slice';
import useAuthenticationSelector from './use-authentication-selector';
import { redirectIfComeBackFromTim } from '../utils/auth-utils';
import authenticationService from '../services/authentication-service';

const useAuthentication = (): void => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, fetchingUserInfo, loggedInWithTaraJwt } = useAuthenticationSelector();
  
  useEffect(() => {
    const cookieFound = authenticationService.hasCookie();
    if (cookieFound) {
      dispatch(getUserinfo());
    }
  }, []);

  useEffect(() => {
   redirectIfComeBackFromTim(() => {
      dispatch(setIsAuthenticated());
   });
    
    if (!isAuthenticated || loggedInWithTaraJwt) {
      dispatch(getUserinfo());
    }
  }, [isAuthenticated, loggedInWithTaraJwt]);

  useEffect(() => {
    if (!isAuthenticated && !fetchingUserInfo) {
      dispatch(loginWithTaraJwt());
    }
  }, [isAuthenticated, fetchingUserInfo]);
};

export default useAuthentication;
