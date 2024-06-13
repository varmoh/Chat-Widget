import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getNameVisibility, getTitleVisibility } from "../slices/chat-slice";

const useNameAndTitleVisibility = () => {
  const dispatch = useAppDispatch();
  const chatId = useAppSelector(state => state.chat.chatId);

  useEffect(() => {
    if(chatId) {
      dispatch(getNameVisibility());
      dispatch(getTitleVisibility());
    }
  }, [chatId]);
}

export default useNameAndTitleVisibility;
