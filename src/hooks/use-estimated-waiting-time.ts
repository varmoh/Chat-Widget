import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getEstimatedWaitingTime, setEstimatedWaitingTimeToZero } from "../slices/chat-slice";

const useEstimatedWaitingTime = () => {
  const customerSupportId = useAppSelector(state => state.chat.customerSupportId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if(!customerSupportId) {
        dispatch(getEstimatedWaitingTime());
      } else {
        dispatch(setEstimatedWaitingTimeToZero());
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [customerSupportId]);
} 

export default useEstimatedWaitingTime;
