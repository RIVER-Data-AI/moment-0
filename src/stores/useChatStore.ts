import { create } from "zustand";

interface Message {
  message: string;
  sender: "river" | "user";
}

interface ChatState {
  messages: Message[];
  addMessage: (message: string, sender: "river" | "user") => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message: string, sender: string) =>
    set((state: ChatState) => ({
      messages: [
        ...state.messages,
        { message, sender: sender as "river" | "user" },
      ],
    })),
}));

export default useChatStore;
