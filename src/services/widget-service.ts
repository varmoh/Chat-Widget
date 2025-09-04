import http from "./http-service";
import {RUUTER_ENDPOINTS} from "../constants";
import {WidgetConfigResponse} from "../model/widget-config-response-model";
import {getMultiDomainUrl} from "./multidomain-service";

class WidgetService {
    getWidgetConfig(): Promise<WidgetConfigResponse> {
        return http.get(RUUTER_ENDPOINTS.GET_WIDGET_CONFIG + getMultiDomainUrl());
    }

    sendContactInfo(chatId: string, email: string, phone: string): Promise<WidgetConfigResponse> {
        return http.post(RUUTER_ENDPOINTS.SEND_CONTACT_INFO, {
            "chatId": chatId,
            "endUserEmail": email,
            "endUserPhone": phone
        });
    }

    authenticateUser(): Promise<WidgetConfigResponse> {
        return http.get(RUUTER_ENDPOINTS.AUTHENTICATE_USER);
    }
}

export default new WidgetService();
