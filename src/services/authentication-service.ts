import http from './http-service';
import { UserInfo } from '../model/user-info-model';

class AuthenticationService {
  loginWithTaraJwt(chatId: string): Promise<void> {
    return http.post('/login-with-tara-jwt', { chatId });
  }

  customJwtUserinfo(): Promise<UserInfo> {
    return http.get('/custom-jwt-userinfo');
  }

  async customJwtExtend(): Promise<{ jwtCookie: string }> {
    const response = await http.get('/custom-jwt-extend');
    return { jwtCookie: `${response}` };
  }
}

export default new AuthenticationService();
