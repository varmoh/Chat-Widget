import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { CHAT_EVENTS } from "../constants";
import { endChat } from "../slices/chat-slice";
import useChatSelector from "./use-chat-selector";
import { isRedirectPathEmpty } from "../utils/auth-utils";

const useReloadChatEndEffect = () => {
  const { chatId } = useChatSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const sessions = localStorage.getItem("sessions");
      if (chatId && isRedirectPathEmpty() && sessions && parseInt(sessions) === 1) {
        localStorage.setItem("sessions", "1");
        dispatch(
          endChat({
            event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS,
            isUpperCase: true,
          })
        );
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
        handleBeforeUnload(event);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chatId]);
}

export default useReloadChatEndEffect;
