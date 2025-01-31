import { CHAT_BUBBLE_PROACTIVE_SECONDS, CHAT_SHOW_BUBBLE_MESSAGE, CHAT_BUBBLE_MESSAGE_DELAY_SECONDS, CHAT_BUBBLE_COLOR, CHAT_BUBBLE_ANIMATION } from '../constants';
import reducer, { closeConfirmationModal, showConfirmationModal, WidgetState } from './widget-slice';

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

describe('Widget slice', () => {
  it('should showConfirmationModal', () => {
    expect(reducer(initialState, showConfirmationModal())).toEqual({
      showConfirmationModal: true,
      burokrattOnlineStatus: null,
    });

    // it('should closeConfirmationModal', () => {
    //   expect(reducer(initialState, closeConfirmationModal())).toEqual({ ...initialState, showConfirmationModal: false });
    // });
  });
});
