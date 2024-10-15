import React from "react";
import useChatStore, { SenderType } from "../stores/useChatStore";
import { MdBusinessCenter } from "react-icons/md";

interface ChatBubbleProps {
  message: string | React.ReactNode;
  sender: SenderType;
  companyName?: string;
}

const senderConfig = {
  user: {
    bgColor: "bg-chat-primary-bg",
    textColor: "text-white",
    icon: null,
    title: null,
  },
  river: {
    bgColor: "bg-chat-secondary-bg",
    textColor: "text-river-black",
    icon: "/logo.png",
    title: "River Intelligence",
  },
  event: {
    bgColor: "bg-chat-secondary-bg",
    textColor: "text-black",
    icon: "/event-icon.png",
    title: null,
  },
  company: {
    bgColor: "bg-chat-secondary-bg",
    textColor: "text-black",
    icon: null,
    title: null,
  },
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  companyName,
}) => {
  const config = senderConfig[sender];
  const { randomNumber } = useChatStore();

  const getTitle = () => {
    if (sender === "river") return config.title;
    if (sender === "company") return companyName ?? "company";
    if (sender === "event") {
      return `+$${randomNumber}`;
    }
    return null;
  };

  if (sender === "event") {
    return (
      <div
        className={`flex items-center rounded-lg w-fit mt-2 px-4 py-2 ${config.bgColor}`}
      >
        <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center mr-2">
          <MdBusinessCenter className="w-5 h-5 text-river-black" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-[#219653]">{getTitle()}</h2>
          <p className="text-xs text-river-black">
            {" "}
            <span className="font-bold">{companyName}</span> has paid to jump on
            your ~wave.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col rounded-lg w-fit mt-2 px-4 py-2 ${config.bgColor}`}
    >
      <div className="flex items-center">
        {config.icon && (
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center mr-2">
            <img src={config.icon} alt={`${sender} icon`} className="w-5 h-5" />
          </div>
        )}
        {sender === "company" && (
          <MdBusinessCenter className="w-5 h-5 text-river-black mr-2" />
        )}
        {getTitle() && (
          <h2 className={`text-md font-semibold ${config.textColor}`}>
            {getTitle()}
          </h2>
        )}
      </div>
      <div className={config.textColor}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
