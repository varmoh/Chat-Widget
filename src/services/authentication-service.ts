import http from './http-service';
import { UserInfo } from '../model/user-info-model';
import { RUUTER_ENDPOINTS } from '../constants';

class AuthenticationService {
  loginWithTaraJwt(chatId: string): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.LOGIN_WITH_TARA, { chatId });
  }

  customJwtUserinfo(): Promise<UserInfo> {
    return http.get(RUUTER_ENDPOINTS.CUSTOM_JWT_USERINFO);
  }

  async customJwtExtend(): Promise<{ jwtCookie: string }> {
    const response = await http.get(RUUTER_ENDPOINTS.CUSTOM_JWT_EXTEND);
    return { jwtCookie: `${response}` };
  }
}

export default new AuthenticationService();
