import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../store";
import sse from "../services/sse-service";
import useChatSelector from "./use-chat-selector";
import { Message } from "../model/message-model";
import {
  addMessagesToDisplay,
  clearStreamingMessage,
  finalizeStreamingMessage,
  handleStateChangingEventMessages,
  sendNewLlmMessage,
  updateStreamingMessage,
} from "../slices/chat-slice";
import { isDisplayableMessages, isStateChangingEventMessage } from "../utils/state-management-utils";
import chatService from "../services/chat-service";
import { v4 as uuidv4 } from "uuid";

const useGetNewMessages = (): void => {
  const { lastReadMessageTimestamp, isChatEnded, chatId } = useChatSelector();
  const dispatch = useAppDispatch();
  const [sseUrl, setSseUrl] = useState("");
  const [lastReadMessageTimestampValue, setLastReadMessageTimestampValue] = useState("");
  const currentStreamContent = useRef("");
  const currentStreamId = useRef("");

  useEffect(() => {
    if (lastReadMessageTimestamp && !lastReadMessageTimestampValue) {
      setLastReadMessageTimestampValue(lastReadMessageTimestamp);
    }
  }, [lastReadMessageTimestamp]);

  useEffect(() => {
    if (isChatEnded || !chatId) {
      setSseUrl("");
    } else if (chatId && lastReadMessageTimestampValue) {
      setSseUrl(`/notifications/${chatId}`);
    }
  }, [isChatEnded, chatId, lastReadMessageTimestampValue]);

  useEffect(() => {
    let events: EventSource | undefined;
    if (sseUrl) {
      const onMessage = async (data: any) => {
        if (!data) return;
        const type = data.type;
        if (type === "message") {
          const messages: Message[] = await chatService.getNewMessages(lastReadMessageTimestampValue.split("+")[0]);
          if (messages.length != 0) {
            setLastReadMessageTimestampValue(messages[messages.length - 1].created ?? `${lastReadMessageTimestamp}`);
            dispatch(addMessagesToDisplay(messages.filter(isDisplayableMessages)));
            dispatch(handleStateChangingEventMessages(messages.filter(isStateChangingEventMessage)));
          }
        } else if (type === "stream_start") {
          currentStreamContent.current = "";
          currentStreamId.current = data.streamId;

        } else if (type === "stream_chunk" && data.channelId === chatId) {
          currentStreamContent.current += data.content;

          const updatedMessage: Message = {
            id: `stream-${data.channelId}`,
            content: currentStreamContent.current,
            authorRole: "assistant",
            created: new Date().toISOString(),
            isStreaming: true,
            streamId: data.channelId,
            chatId: chatId,
            authorTimestamp: new Date().toISOString(),
          };

          dispatch(updateStreamingMessage(updatedMessage));
        } else if (type === "stream_complete" && data.channelId === chatId) {
          dispatch(
            finalizeStreamingMessage({
              streamId: data.channelId,
              finalContent: currentStreamContent.current,
            })
          );

          currentStreamContent.current = "";
          currentStreamId.current = "";
        } else if (type === "stream_error" && data.channelId === chatId) {
          dispatch(clearStreamingMessage(data.channelId));
          currentStreamContent.current = "";
          currentStreamId.current = "";
        } else if (type === "complete_response") {
          const uuid = uuidv4();
          const message: Message = {
            id: uuid,
            content: data.content,
            authorRole: "assistant",
            created: new Date().toISOString(),
            isStreaming: false,
            chatId: chatId,
            authorTimestamp: new Date().toISOString(),
          };
          dispatch(addMessagesToDisplay([message]));
          dispatch(sendNewLlmMessage({ message, context: data.context, uuid }));
        }
      };

      events = sse(sseUrl, onMessage);
    }
    return () => {
      events?.close();
      if (currentStreamId.current) {
        dispatch(clearStreamingMessage(currentStreamId.current));
      }
    };
  }, [sseUrl]);
};

export default useGetNewMessages;
