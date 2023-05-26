import http2 from "./http2-service";
import { RUUTER_ENDPOINTS } from "../constants";
import { WidgetConfigResponse } from "../model/widget-config-response-model";

class WidgetService {
  getWidgetConfig(): Promise<WidgetConfigResponse> {
    return http2.get(RUUTER_ENDPOINTS.GET_CHAT_CONFIG);
  }
}

export default new WidgetService();
