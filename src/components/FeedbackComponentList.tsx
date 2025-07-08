import React from "react";
import FeedBackIcon from "../assets/componentsSvg/adminsvg/feedbackIcon";
import BaruunsumBultsgar from "../assets/componentsSvg/adminsvg/baruunsumBultsgar";
import Xicon from "../assets/componentsSvg/adminsvg/xIcon";
import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";
import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";

interface FeedbackItem {
  id: string; // Unique identifier for the feedback
  feedbackType: string; // Type of feedback (e.g., "Сайн ажилтан")
  rewardType: string; // Type of reward (e.g., "Урамшуулал")
  message: string; // Feedback message content
  timestamp: string; // Timestamp for when the feedback was given
  profileImage: string; // URL of the profile image
}

// Define the props for the FeedbackComponentList

const FeedbackComponentList: React.FC<{ data?: any[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-white/60 text-sm px-4">Илэрхий зөрчил олдсонгүй</div>
    );
  }

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-[10px]">
      {data.map((item, index) => (
        <div
          key={item._id || index}
          className={`pl-[16px] pr-[18px] rounded-[14px] ${
            item.status === "resolved"
              ? " bg-white/10"
              : "border-[#F6C32466] border-[1px] bg-[#F6C32414]"
          } flex justify-between items-center min-h-[58px] text-white/80`}
        >
          <img
            className="w-[32px] h-[32px] rounded-[14px]"
            src={item.image}
            alt=""
          />
          <h3 className="text-[14px]">{"Зөрчил"}</h3>
          <div className="h-[30px] px-[14px] py-[10px] text-[12px] leading-[12px] bg-white/10 rounded-[8px] ">
            {item.propertyId?.name || "Үл мэдэх байр"}
          </div>
          <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px]">
            {item.description}
          </div>
          <div className="whitespace-nowrap text-ellipsis text-[14px]">
            {new Date(parseInt(item.createdAt)).toLocaleString("mn-MN")}
          </div>
          <div
            className={`border rounded-[8px] w-[30px] h-[30px] flex items-center justify-center ${
              item.status === "resolved"
                ? "bg-[#80FFB714] border-[#80FFB766]"
                : "bg-[#F6C32414] border-[#F6C32466]"
            }
`}
          >
            {item.status === "unresolved" ? <Xicon /> : <CorrectIcon />}
          </div>
          <div className="w-[30px] h-[30px] relative">
            <img
              src={item.userId?.profilePic || "/image/profile.png"}
              className="w-full h-full rounded-full bg-white/50"
              alt=""
            />
            <div className="w-2 h-2 rounded-full bg-[#80FFB7] absolute bottom-0 right-0" />
          </div>
          <BaruunSum />
        </div>
      ))}
    </div>
  );
};

export default FeedbackComponentList;
