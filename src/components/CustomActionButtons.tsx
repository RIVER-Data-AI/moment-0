import type { CustomAction } from "@/libs/types";

const CustomActionButtons: React.FC<{
  action: CustomAction;
  onSelect: (option: string) => void;
}> = ({ action, onSelect }) => {
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
      return (
        <div className="flex justify-center mb-4">
          <button
            className="bg-chat-primary-bg text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
            onClick={() => onSelect(action.prompt || action.type)}
          >
            {action.prompt || action.type}
          </button>
        </div>
      );
    default:
      return null;
  }
};

export default CustomActionButtons;
