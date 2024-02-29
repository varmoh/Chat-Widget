import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import sse from '../services/sse-service';
import useChatSelector from './use-chat-selector';
import { setChat } from '../slices/chat-slice';
import chatService from '../services/chat-service';

const useGetChat = (): void => {
  const { isChatEnded, chatId } = useChatSelector();
  const dispatch = useAppDispatch();
  const [sseUrl, setSseUrl] = useState('');

  useEffect(() => {
    if (isChatEnded || !chatId){
      setSseUrl('');
    } else if(chatId) {
      setSseUrl('/notifications/chat-list');
    }
  }, [chatId, isChatEnded]);

  useEffect(() => {
    let events: EventSource | undefined;
    if (sseUrl) {  
      const onMessage = async (data: any) => {   
        if (data === chatId) {
          const chat = await chatService.getChatById();
          dispatch(setChat(chat))
        } 
      };

      events = sse(sseUrl, onMessage);
    }
    return () => {
      events?.close();
    };
  }, [sseUrl]);
};

export default useGetChat;
