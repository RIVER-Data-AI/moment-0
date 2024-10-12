import { create } from "zustand";

interface Message {
  message: string;
  sender: "river" | "user";
}

interface ChatState {
  messages: Message[];
  addMessage: (message: string, sender: "river" | "user") => void;
  updateLatestMessage: (message: string) => void;
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
  updateLatestMessage: (message: string) =>
    set((state: ChatState) => {
      if (state.messages.length === 0) return state;
      const updatedMessages = [...state.messages];
      updatedMessages[updatedMessages.length - 1] = {
        ...updatedMessages[updatedMessages.length - 1],
        message,
      };
      return { messages: updatedMessages };
    }),
}));

export default useChatStore;
