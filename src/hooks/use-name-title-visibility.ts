import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getNameVisibility, getTitleVisibility } from "../slices/chat-slice";

const useNameAndTitleVisibility = () => {
  const customerSupportId = useAppSelector(state => state.chat.customerSupportId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!customerSupportId) {
      dispatch(getNameVisibility());
      dispatch(getTitleVisibility());
    }
  }, [customerSupportId]);
}

export default useNameAndTitleVisibility;
