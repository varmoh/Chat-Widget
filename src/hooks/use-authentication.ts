import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { loginWithTaraJwt, setIsAuthenticated } from '../slices/authentication-slice';
import useAuthenticationSelector from './use-authentication-selector';
import { redirectIfComeBackFromTim } from '../utils/auth-utils';

const useAuthentication = (): void => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, fetchingUserInfo, loggedInWithTaraJwt } = useAuthenticationSelector();

  useEffect(() => {
   redirectIfComeBackFromTim(() => {
      dispatch(setIsAuthenticated());
   });
    
    if (!isAuthenticated || loggedInWithTaraJwt) {
      // To be done: TO be uncommented later when end user authentication is ready
      // dispatch(getUserinfo());
    }
  }, [isAuthenticated, loggedInWithTaraJwt]);

  useEffect(() => {
    if (!isAuthenticated && !fetchingUserInfo) {
      dispatch(loginWithTaraJwt());
    }
  }, [isAuthenticated, fetchingUserInfo]);
};

export default useAuthentication;
