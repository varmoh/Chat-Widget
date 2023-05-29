import http2 from "./http2-service";
import { RUUTER_ENDPOINTS } from "../constants";
import { WidgetConfigResponse } from "../model/widget-config-response-model";

class WidgetService {
  getWidgetConfig(): Promise<WidgetConfigResponse> {
    return http2.get(RUUTER_ENDPOINTS.GET_CHAT_CONFIG);
  }

  sendContactInfo(chatId:string, email: string, phone: string): Promise<WidgetConfigResponse> {
    return http2.post(RUUTER_ENDPOINTS.SEND_CONTACT_INFO, {
      "chatId": chatId,
      "endUserEmail": email,
      "endUserPhone": phone
    });
  }

  authenticateUser(chatId:string, id: string, firstName: string, lastName: string): Promise<WidgetConfigResponse> {
    return http2.post(RUUTER_ENDPOINTS.AUTHENTICATE_USER, {
      "chatId": chatId,
      "endUserId": id,
      "endUserFirstName": firstName,
      "endUserLastName": lastName
    });
  }
}

export default new WidgetService();
