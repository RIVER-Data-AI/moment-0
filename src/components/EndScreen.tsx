import React from "react";
import { FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import { MdSwipe, MdArrowDropDownCircle, MdModeComment } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import TildeHeader from "./TildeHeader";

const EndScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-3 pb-20">
        <PostList />
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="bg-[#F5F5F5] flex overflow-x-auto overflow-y-hidden whitespace-nowrap p-4">
      <div className="flex-shrink-0 bg-white flex items-center p-5 border-2 border-primary-border rounded-lg mr-4">
        <FaQuestionCircle className="text-river-black mr-2" size={20} />
        <MdSwipe className="text-river-black" size={20} />
      </div>
      <div className="flex-shrink-0 bg-white flex flex-col justify-start text-start border-primary-border border-2 rounded-lg p-2 mr-4 w-48">
        <span className="text-river-black text-sm">Learn</span>
        <span className="text-river-black font-semibold truncate">
          What is a wave?
        </span>
      </div>
      <div className="flex-shrink-0 bg-white flex flex-col justify-start text-start border-primary-border border-2 rounded-lg p-2 w-48">
        <span className="text-river-black text-sm">How to</span>
        <span className="text-river-black font-semibold truncate">
          This is a datapoint
        </span>
      </div>
    </div>
  );
};

interface PostProps {
  username: string;
  content: string;
  images?: string[];
  stats: {
    waves: number;
    comments: number;
    usd: number;
  };
}

const Post: React.FC<PostProps> = ({ username, content, images, stats }) => {
  return (
    <div className="flex flex-col text-river-black gap-1">
      <div className="bg-white p-2 border-2 border-primary-border">
        <div className="flex items-center">
          <TildeHeader />
          <BiWorld className="text-opacity-70 text-river-black h-5 w-5" />
          <BsThreeDotsVertical className="text-opacity-70 text-river-black h-5 w-5" />
        </div>
        <div className="flex pt-2 gap-1">
          <FaUserCircle className="h-5 w-5" />
          <span className="font-semibold text-sm">{username}</span>
        </div>
        <div className="py-2 text-start text-sm">{content}</div>
        {images && images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-hidden">
            {images.length === 3 ? (
              <>
                <img
                  src={images[0]}
                  alt="Post image 1"
                  className="col-span-1 row-span-2 h-48 object-cover"
                />
                <img
                  src={images[1]}
                  alt="Post image 2"
                  className="col-span-1 h-24 object-cover"
                />
                <img
                  src={images[2]}
                  alt="Post image 3"
                  className="col-span-1 h-24 object-cover"
                />
              </>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="col-span-2 w-full object-cover"
                />
              ))
            )}
          </div>
        )}
      </div>
      <div className="flex text-xs justify-between font-semibold">
        <span>{stats.waves} surfers</span>
        <span>{stats.comments} comments</span>
      </div>
      <ActionBar />
    </div>
  );
};

const ActionBar: React.FC = () => {
  return (
    <div className="flex gap-4 justify-between">
      <button className="flex items-center text-river-black text-opacity-80 text-xs gap-1">
        <img className="h-5 w-5" src="/surf-icon.png" alt="" /> Surf
      </button>
      <button className="flex items-center text-river-black text-opacity-80 text-xs gap-1">
        <MdArrowDropDownCircle className="h-5 w-5" /> Sink
      </button>
      <button className="flex items-center text-river-black text-opacity-80 text-xs gap-1">
        <img className="h-5 w-5" src="/ripple-icon.png" alt="" /> Ripple
      </button>
      <button className="flex items-center text-river-black text-opacity-80 text-xs gap-1">
        <MdModeComment className="h-5 w-5" /> Comment
      </button>
      <button className="flex items-center text-river-black text-opacity-80 text-xs gap-1">
        <IoMdShareAlt className="h-5 w-5" /> Share
      </button>
    </div>
  );
};

const PostList: React.FC = () => {
  const posts: PostProps[] = [
    {
      username: "Lionel Messi",
      content:
        "Intense training session today! 🔥⚽️ Team is ready for the big match on Saturday. Honored to play for this club.",
      images: [
        "/inter-miami-image.png",
        "/training-image-1.png",
        "/training-image-2.png",
      ],
      stats: { waves: 1300, comments: 4000, usd: 491 },
    },
    {
      username: "Chris Frantz",
      content:
        "Clean up weekend in Santa Monica! Let us know where you think we should clean the weekend :)",
      stats: { waves: 4, comments: 8, usd: 2.5 },
    },
    {
      username: "Monica Garcia",
      content: "I love Vamos Vamos in Santa monica",
      stats: { waves: 3, comments: 0, usd: 0 },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default EndScreen;
