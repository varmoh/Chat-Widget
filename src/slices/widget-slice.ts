import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CHAT_BUBBLE_PROACTIVE_SECONDS,
  CHAT_SHOW_BUBBLE_MESSAGE,
  CHAT_BUBBLE_MESSAGE_DELAY_SECONDS,
  CHAT_BUBBLE_COLOR,
  CHAT_BUBBLE_ANIMATION,
} from "../constants";
import WidgetService from "../services/widget-service";
import { endChat } from "./chat-slice";
import { RootState } from '../store';

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
    isBurokrattActive: boolean | null;
  };
  chatId?: string | null;
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
    isBurokrattActive: null,
  },
  chatId: null,
};

export const getWidgetConfig = createAsyncThunk("widget/getWidgetConfig", async (_, { getState, dispatch }) => {
  const state = getState() as RootState;
  dispatch(setChatId(state.chat.chatId));
  return WidgetService.getWidgetConfig();
});

export const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string | null>) => {
      state.chatId = action.payload;
    },
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
    builder.addCase(getWidgetConfig.rejected, (state) => {
      state.widgetConfig.isLoaded = true;
      state.burokrattOnlineStatus = false;
    });
    builder.addCase(getWidgetConfig.fulfilled, (state, action) => {
      state.widgetConfig.isLoaded = true;
      state.widgetConfig.proactiveSeconds = action.payload?.widgetProactiveSeconds ?? CHAT_BUBBLE_PROACTIVE_SECONDS;
      state.widgetConfig.showMessage = action.payload?.isWidgetActive === 'true';
      state.widgetConfig.bubbleMessageSeconds = action.payload?.widgetDisplayBubbleMessageSeconds ?? CHAT_BUBBLE_MESSAGE_DELAY_SECONDS;
      state.widgetConfig.bubbleMessageText = action.payload?.widgetBubbleMessageText ?? "";
      state.widgetConfig.color = action.payload?.widgetColor ?? CHAT_BUBBLE_COLOR;
      state.widgetConfig.animation = action.payload?.widgetAnimation ?? CHAT_BUBBLE_ANIMATION;
      state.widgetConfig.isBurokrattActive = action.payload?.isBurokrattActive === 'true';
      if (state.chatId != null && state.widgetConfig.isBurokrattActive === false) {
        state.burokrattOnlineStatus = true;
      } else {
        state.burokrattOnlineStatus = state.widgetConfig.isBurokrattActive;
      }
    });
  },
});

export const { setChatId, showConfirmationModal, closeConfirmationModal } = widgetSlice.actions;

export default widgetSlice.reducer;
