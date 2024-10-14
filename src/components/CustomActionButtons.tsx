import type { CustomAction } from "@/libs/types";
import useChatStore from "@/stores/useChatStore";
import {
  FaLink,
  FaCommentAlt,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaDownload,
  FaEllipsisH,
} from "react-icons/fa";

const CustomActionButtons: React.FC<{
  action: CustomAction;
  onSelect: (option: string) => void;
}> = ({ action, onSelect }) => {
  const { setShowShareOverlay } = useChatStore();
  switch (action.type) {
    case "wave":
      return (
        <div className="grid grid-cols-2 gap-2 my-2">
          {action.options?.map((option, index) => (
            <button
              key={index}
              className="bg-white text-black px-4 py-2 rounded-full border-2 border-river-black hover:bg-gray-100 transition-colors"
              onClick={() => onSelect(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      );
    case "location":
    case "share":
      const shareOptions = [
        { icon: <FaLink />, label: "Copy link" },
        { icon: <FaCommentAlt />, label: "SMS" },
        { icon: <FaTwitter />, label: "X" },
        { icon: <FaInstagram />, label: "Stories" },
        { icon: <FaInstagram />, label: "Messages" },
        { icon: <FaWhatsapp />, label: "WhatsApp" },
        { icon: <FaFacebookF />, label: "Facebook" },
        { icon: <FaDownload />, label: "Download" },
        { icon: <FaEllipsisH />, label: "More" },
      ];
      return (
        <>
          <div className="grid grid-cols-3 gap-4 my-4">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                className="flex flex-col text-river-black items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setShowShareOverlay(true)}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </>
      );

    default:
      return null;
  }
};

export default CustomActionButtons;
