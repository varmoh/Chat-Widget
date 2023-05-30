import http from './http-service';
import { UserInfo } from '../model/user-info-model';
import { CustomJwtExtendResponse } from '../model/ruuter-response-model';


export const customJwt = 'clientCustomJwtCookie';

class AuthenticationService {
  loginWithTaraJwt(chatId: string): Promise<void> {
    return http.post('/login-with-tara-jwt', { chatId });
  }

  customJwtUserinfo(): Promise<UserInfo> {
    return http.post('/custom-jwt-userinfo', customJwt);
  }

  customJwtExtend(): Promise<CustomJwtExtendResponse> {
    return http.post('/custom-jwt-extend')
  }
}

export default new AuthenticationService();
