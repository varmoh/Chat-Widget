import {Middleware} from "redux";
import {initChat} from "../../slices/chat-slice";
import {RUUTER_ENDPOINTS} from "../../constants";
import http from "../../services/http-service";

const chatApiMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
    const result = next(action);

    if (initChat.fulfilled.match(action)) {
        try {
            const state = storeAPI.getState();
            const widgetConfig = state.widget?.widgetConfig;

            const newKey = await http.post(RUUTER_ENDPOINTS.ADD_TIM, {
                chatId: action.payload.id,
                timeout: widgetConfig?.chatActiveDuration ?? 30,
            });
            console.log('added new key', newKey)
        } catch (err) {
            console.error("Failed to call add id to TIM:", err);
        }
    }

    return result;
};

export default chatApiMiddleware;