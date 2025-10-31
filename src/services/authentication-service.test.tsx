import AuthenticationService from './authentication-service';
import http from './http-service';

jest.mock('../services/http-service');

describe('AuthenticationService', () => {
  it('should make a request to /custom-jwt-userinfo', () => {
    AuthenticationService.customJwtUserinfo();
    expect(http.post).toHaveBeenCalledWith('/custom-jwt-userinfo', 'clientCustomJwtCookie');
  });
});
