import { create } from "zustand";

export type SenderType = "river" | "user" | "event" | "company";

interface Message {
  message: string;
  sender: SenderType;
  companyName?: string;
}

export interface DataPoint {
  category: string;
  value: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (
    message: string,
    sender: SenderType,
    companyName?: string
  ) => number;
  dataPoints: DataPoint[];
  setDataPoints: (dataPoints: DataPoint[]) => void;
  randomNumber: number;
  setRandomNumber: (number: number) => void;
  updateLatestMessage: (message: string, index: number) => void;
  removeMessage: (index: number) => void;
  showShareOverlay: boolean;
  setShowShareOverlay: (show: boolean) => void;
  showSignUpForm: boolean;
  setShowSignUpForm: (show: boolean) => void;
  showEndScreen: boolean;
  setShowEndScreen: (show: boolean) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  randomNumber: 0,
  dataPoints: [],
  setDataPoints: (dataPoints: DataPoint[]) => set({ dataPoints }),
  setRandomNumber: (number) => set({ randomNumber: number }),
  addMessage: (message, sender, companyName) => {
    let newIndex = -1;
    set((state) => {
      newIndex = state.messages.length;
      let newMessage: Message = { message, sender };
      if (companyName) {
        newMessage = { ...newMessage, companyName };
      }
      return { messages: [...state.messages, newMessage] };
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
  removeMessage: (index) =>
    set((state) => {
      const newMessages = [...state.messages];
      newMessages.splice(index, 1);
      return { messages: newMessages };
    }),
  showShareOverlay: false,
  setShowShareOverlay: (show: boolean) => set({ showShareOverlay: show }),
  showSignUpForm: false,
  setShowSignUpForm: (show: boolean) => set({ showSignUpForm: show }),
  showEndScreen: false,
  setShowEndScreen: (show: boolean) => set({ showEndScreen: show }),
}));

export default useChatStore;
