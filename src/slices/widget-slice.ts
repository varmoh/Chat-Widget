import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CHAT_BUBBLE_PROACTIVE_SECONDS,
  CHAT_SHOW_BUBBLE_MESSAGE,
  CHAT_BUBBLE_MESSAGE_DELAY_SECONDS,
  CHAT_BUBBLE_COLOR,
  CHAT_BUBBLE_ANIMATION,
} from "../constants";
import WidgetService from "../services/widget-service";
import chatService from '../services/chat-service';
import { endChat } from "./chat-slice";

export interface WidgetState {
  showConfirmationModal: boolean;
  burokrattOnlineStatus: boolean | null;
  widgetConfig: {
    proactiveSeconds: number;
    showMessage: boolean;
    bubbleMessageSeconds: number;
    bubbleMessageText: string;
    color: string;
    animation: string;
    isLoaded: boolean;
  };
}

const initialState: WidgetState = {
  showConfirmationModal: false,
  burokrattOnlineStatus: null,
  widgetConfig: {
    proactiveSeconds: CHAT_BUBBLE_PROACTIVE_SECONDS,
    showMessage: CHAT_SHOW_BUBBLE_MESSAGE,
    bubbleMessageSeconds: CHAT_BUBBLE_MESSAGE_DELAY_SECONDS,
    bubbleMessageText: "",
    color: CHAT_BUBBLE_COLOR,
    animation: CHAT_BUBBLE_ANIMATION,
    isLoaded: false,
  },
};

export const getWidgetConfig = createAsyncThunk("chat/getWidgetConfig", async () => WidgetService.getWidgetConfig());

export const burokrattOnlineStatusRequest = createAsyncThunk('widget/burokrattOnlineStatus', async () => chatService.burokrattOnlineStatus());

export const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    showConfirmationModal: (state) => {
      state.showConfirmationModal = true;
    },
    closeConfirmationModal: (state) => {
      state.showConfirmationModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endChat.pending, (state) => {
      state.showConfirmationModal = false;
    });
    builder.addCase(burokrattOnlineStatusRequest.fulfilled, (state) => {
      state.burokrattOnlineStatus = true;
    });
    builder.addCase(burokrattOnlineStatusRequest.rejected, (state) => {
      state.burokrattOnlineStatus = false;
    });
    builder.addCase(getWidgetConfig.rejected, (state) => {
      state.widgetConfig.isLoaded = true;
    });
    builder.addCase(getWidgetConfig.fulfilled, (state, action) => {
      state.widgetConfig.isLoaded = true;
      state.widgetConfig.proactiveSeconds = action.payload?.widgetProactiveSeconds ?? CHAT_BUBBLE_PROACTIVE_SECONDS;
      state.widgetConfig.showMessage = action.payload?.isWidgetActive ?? CHAT_SHOW_BUBBLE_MESSAGE;
      state.widgetConfig.bubbleMessageSeconds =
        action.payload?.widgetDisplayBubbleMessageSeconds ?? CHAT_BUBBLE_MESSAGE_DELAY_SECONDS;
      state.widgetConfig.bubbleMessageText = action.payload?.widgetBubbleMessageText ?? "";
      state.widgetConfig.color = action.payload?.widgetColor ?? CHAT_BUBBLE_COLOR;
      state.widgetConfig.animation = action.payload?.widgetAnimation ?? CHAT_BUBBLE_ANIMATION;
    });
  },
});

export const { showConfirmationModal, closeConfirmationModal } = widgetSlice.actions;

export default widgetSlice.reducer;
