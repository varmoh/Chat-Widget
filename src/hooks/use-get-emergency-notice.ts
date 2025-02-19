import { useEffect } from "react";
import { CHAT_EVENTS } from "../constants";
import { getEmergencyNotice, addMessageToTop } from "../slices/chat-slice";
import { useAppDispatch } from "../store";
import useChatSelector from "./use-chat-selector";
import { format } from "date-fns";

const useGetEmergencyNotice = (): void => {
  const { emergencyNotice, messages, chatId } = useChatSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (emergencyNotice === null) {
      dispatch(getEmergencyNotice());
      return;
    }

    if (!messages.map((m) => m.event).includes(CHAT_EVENTS.EMERGENCY_NOTICE)) {
      if (!emergencyNotice.isVisible) return;
      const formatDate = (date: Date) => new Date(format(date, "yyyy-MM-dd"));
      const startDate = formatDate(new Date(emergencyNotice.start));
      const endDate = formatDate(new Date(emergencyNotice.end));
      const currentDate = formatDate(new Date());

      if (startDate <= currentDate && endDate >= currentDate) {
        dispatch(
          addMessageToTop({
            chatId,
            event: CHAT_EVENTS.EMERGENCY_NOTICE,
            content: emergencyNotice.text,
            authorTimestamp: new Date().toISOString(),
            authorRole: "chatbot",
          })
        );
      }
    }
  }, [dispatch, emergencyNotice, chatId]);
};

export default useGetEmergencyNotice;
