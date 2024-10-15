import type { CustomAction } from "@/libs/types";
import useChatStore from "@/stores/useChatStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaLink,
  FaCommentAlt,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaDownload,
  FaEllipsisH,
  FaArrowRight,
} from "react-icons/fa";

const CustomActionButtons: React.FC<{
  action: CustomAction;
  onSelect: (option: string) => void;
}> = ({ action, onSelect }) => {
  const { setShowShareOverlay, setShowSignUpForm } = useChatStore();

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(
      month !== "" && day !== "" && year !== "" && year.length === 4
    );
    console.log("isComplete", isComplete);
  }, [month, day, year]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={action.type}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {(() => {
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
            case "join":
              return (
                <div className="flex justify-center items-center py-20">
                  <button
                    className="bg-river-black text-white font-semibold flex items-center gap-2 px-10 py-2 rounded-lg border-2 border-river-black hover:bg-gray-100 transition-colors"
                    onClick={() => setShowSignUpForm(true)}
                  >
                    Jump in - join RIVER
                    <FaArrowRight size={20} />
                  </button>
                </div>
              );
            case "birthdate": // create three inputs for month, day and year and input should be numeric
              return (
                <div className="flex flex-col items-center justify-center gap-2 my-2">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <input
                      type="number"
                      pattern="\d*"
                      placeholder="MM"
                      maxLength={2}
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full text-river-black text-center py-2 px-3 rounded-full border-2 border-gray-300 focus:border-river-black focus:outline-none"
                    />
                    <input
                      type="number"
                      pattern="\d*"
                      placeholder="DD"
                      maxLength={2}
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="w-full text-river-black text-center py-2 px-3 rounded-full border-2 border-gray-300 focus:border-river-black focus:outline-none"
                    />
                    <input
                      type="number"
                      pattern="\d*"
                      placeholder="YYYY"
                      maxLength={4}
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full text-river-black text-center py-2 px-3 rounded-full border-2 border-gray-300 focus:border-river-black focus:outline-none"
                    />
                  </div>
                  <button
                    className={`mt-2 w-full font-semibold px-6 py-2 rounded-full transition-colors ${
                      isComplete
                        ? "bg-river-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      isComplete && onSelect(`${month}/${day}/${year}`)
                    }
                    disabled={!isComplete}
                  >
                    Submit
                  </button>
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
              );
            default:
              return null;
          }
        })()}
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomActionButtons;
