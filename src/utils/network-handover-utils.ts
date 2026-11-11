// Bürokrati võrgustik (demo): vestluse avamine teise asutuse ühekordse lingiga.
// Link: <vidina aadress>/?byk_handover=<token>. Ruuter (network/handover) lunastab tokeni, annab
// chatJwt küpsise ja vestluse ID; vidin salvestab selle nagu oma vestluse ja laeb lehe ilma tokenita uuesti.
import { SESSION_STORAGE_CHAT_ID_KEY } from "../constants";
import ChatService from "../services/chat-service";
import { namespacedKey } from "./widget-instance-utils";
import { setToLocalStorage } from "./local-storage-utils";

export const NETWORK_HANDOVER_PARAM = "byk_handover";

const urlWithoutToken = (): string => {
  const url = new URL(window.location.href);
  url.searchParams.delete(NETWORK_HANDOVER_PARAM);
  return url.toString();
};

export const redeemNetworkHandover = async (): Promise<void> => {
  const token = new URLSearchParams(window.location.search).get(NETWORK_HANDOVER_PARAM);
  if (!token) return;
  try {
    // vana vestluse ID ei tohi päringule kaasa minna (http-service lisab selle)
    localStorage.removeItem(namespacedKey(SESSION_STORAGE_CHAT_ID_KEY));
  } catch { /* privaatrežiim */ }
  try {
    const chatId = await ChatService.networkHandover(token);
    if (typeof chatId === "string" && chatId) {
      setToLocalStorage(SESSION_STORAGE_CHAT_ID_KEY, chatId);
    }
  } catch {
    // aegunud või kasutatud link: vidin avaneb tavaliselt
  }
  window.location.replace(urlWithoutToken());
};

// A pool: kui kasutaja avab vestlusest teise asutuse lingi (uues aknas), lõpetatakse siinne vestlus
// ja vidin suletakse. Leht ise jääb lahti. Kuulame klikke kogu dokumendis (link on Markdowni sõnumis).
export const watchNetworkHandoverLinks = (onOpen: () => void): (() => void) => {
  const listener = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const link = target?.closest?.(`a[href*="${NETWORK_HANDOVER_PARAM}="]`);
    if (!link) return;
    // brauser avab lingi uues aknas (target=_blank); vestluse lõpetame pärast seda
    setTimeout(onOpen, 300);
  };
  document.addEventListener("click", listener, true);
  return () => document.removeEventListener("click", listener, true);
};
