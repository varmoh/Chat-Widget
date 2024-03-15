import { useEffect, useState } from 'react';
import sse from '../services/sse-service';
import useChatSelector from './use-chat-selector';
import { useDispatch } from 'react-redux';
import { getEstimatedWaitingTime } from '../slices/chat-slice';

const useQueueCounter = () => {
  const { chatId } = useChatSelector(); 
  const [counter, setCounter] = useState<number>(0);
  const dispatch = useDispatch();
  
  useEffect(() => {

    if(!chatId) return;

    const events = sse(`/queue/${chatId}`, (data: number) => {
      setCounter(data);
      dispatch(getEstimatedWaitingTime());
    });

    return () => {
      events?.close();
    };
  }, [chatId]);

  return counter;
};

export default useQueueCounter;
