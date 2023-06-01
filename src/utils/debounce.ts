import { CHAT_INPUT_DEBOUNCE_TIMEOUT } from "../constants";

export default function debounce(
  func: (...params: any[]) => any,
  timeout: number = CHAT_INPUT_DEBOUNCE_TIMEOUT,
  immed: boolean = false,
) {
  let timer: number | undefined | any = undefined;
  return function (this: any, ...args: any[]) {
    if (timer === undefined && immed) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
    return timer;
  }
}
