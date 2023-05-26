import { useAppSelector } from "../store";
import { WidgetState } from "../slices/widget-slice";

const useWidgetSelector = (): WidgetState => ({ ...useAppSelector(({ widget }) => widget) });

export default useWidgetSelector;
