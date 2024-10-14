import { create } from "zustand";

interface Message {
  message: string;
  sender: "river" | "user";
}

interface ChatState {
  messages: Message[];
  addMessage: (message: string, sender: "river" | "user") => number;
  updateLatestMessage: (message: string, index: number) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message, sender) => {
    let newIndex = -1;
    set((state) => {
      newIndex = state.messages.length;
      return { messages: [...state.messages, { message, sender }] };
    });
    return newIndex;
  },
  updateLatestMessage: (message, index) =>
    set((state) => {
      const newMessages = [...state.messages];
      if (newMessages[index]) {
        newMessages[index].message = message;
      }
      return { messages: newMessages };
    }),
}));

export default useChatStore;
