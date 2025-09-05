import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_TARA_LOGIN_REDIRECT } from "./constants";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = localStorage.getItem(LOCAL_STORAGE_TARA_LOGIN_REDIRECT);
    const allowedURLPattern = /(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w.-]+)+\/?/;

    if (redirectPath && allowedURLPattern.test(redirectPath)) {
      localStorage.removeItem(LOCAL_STORAGE_TARA_LOGIN_REDIRECT);
      navigate(redirectPath, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <span>processing authentication...</span>
  );
};

export default AuthCallback;