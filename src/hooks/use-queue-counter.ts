import { useEffect, useState } from 'react';
import sse from '../services/sse-service';
import useChatSelector from './use-chat-selector';

const useQueueCounter = () => {
  const { chatId } = useChatSelector(); 
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {

    if(!chatId) return;

    const events = sse(`/queue/${chatId}`, (data: number) => {
      setCounter(data);
    });

    return () => {
      events?.close();
    };
  }, [chatId]);

  return counter;
};

export default useQueueCounter;
