import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { addChatToTerminationQueue, removeChatFromTerminationQueue } from "../slices/chat-slice";
import useChatSelector from "./use-chat-selector";
import { isRedirectPathEmpty } from "../utils/auth-utils";
import {isLastSession, wasPageReloadedNavigate} from "../utils/browser-utils";

const useReloadChatEndEffect = () => {
  const { chatId } = useChatSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeChatFromTerminationQueue());
  }, [dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!wasPageReloadedNavigate() && chatId && isRedirectPathEmpty() && isLastSession()) {
        dispatch(addChatToTerminationQueue());
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "F5" && (event.ctrlKey && event.key === "r")) {
        handleBeforeUnload();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chatId, dispatch]);
}

export default useReloadChatEndEffect;
