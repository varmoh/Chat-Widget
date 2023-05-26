import { useEffect } from "react";
import { getWidgetConfig } from "../slices/widget-slice";
import { useAppDispatch } from "../store";
import useWidgetSelector from "./use-widget-selector";

const useGetWidgetConfig = (): void => {
  const { widgetConfig } = useWidgetSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!widgetConfig.isLoaded) dispatch(getWidgetConfig());
  }, [dispatch, widgetConfig]);
};

export default useGetWidgetConfig;
