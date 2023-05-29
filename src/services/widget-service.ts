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
}

export default new WidgetService();
