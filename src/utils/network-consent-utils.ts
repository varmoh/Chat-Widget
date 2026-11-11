// Bürokrati võrgustik (demo): nõusoleku nupud. Ruuter (network/incoming) lisab nõusoleku sõnumile
// nupud payload'iga "#network-consent:yes|no:<päringu ID>". Vajutus ei lähe botile sõnumina,
// vaid kutsub network/consent (sõltumata vestluse režiimist, ka LLM-režiimis).
import { Message } from "../model/message-model";
import ChatService from "../services/chat-service";

export const NETWORK_CONSENT_PREFIX = "#network-consent:";

export interface NetworkConsentButton {
  title: string;
  accept: boolean;
  requestId: string;
}

export const parseNetworkConsent = (message: Message): NetworkConsentButton[] => {
  if (!message.buttons || !message.buttons.includes(NETWORK_CONSENT_PREFIX)) return [];
  try {
    const buttons = JSON.parse(message.buttons) as { title: string; payload: string }[];
    return buttons
      .filter((b) => typeof b.payload === "string" && b.payload.startsWith(NETWORK_CONSENT_PREFIX))
      .map((b) => {
        const [choice, ...rest] = b.payload.slice(NETWORK_CONSENT_PREFIX.length).split(":");
        return { title: b.title, accept: choice === "yes", requestId: rest.join(":") };
      });
  } catch {
    return [];
  }
};

export const isNetworkConsentPayload = (payload: string): boolean => payload.startsWith(NETWORK_CONSENT_PREFIX);

export const sendNetworkConsent = (chatId: string | null, payload: string): Promise<void> => {
  const [choice, ...rest] = payload.slice(NETWORK_CONSENT_PREFIX.length).split(":");
  return ChatService.networkConsent(chatId ?? "", rest.join(":"), choice === "yes");
};
