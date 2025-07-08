import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import Xicon from "../assets/componentsSvg/adminsvg/xIcon";

interface ZorchilPropsType {
  title?: string;
  date?: string;
  imgUrl?: string;
  status?: string;
  profilePic?: string;
}

function ZorchilList({
  title,
  date,
  imgUrl,
  status,
  profilePic,
}: ZorchilPropsType) {
  return (
    <div className="flex items-center min-h-[56px] justify-between bg-[#80FFB714] border border-[#80FFB766]  pr-[18px] pl-[17px] rounded-[14px]">
      <div className="flex items-center gap-[11px]">
        <img
          className="w-[32px] h-[32px] rounded-[8px] "
          src={imgUrl ? imgUrl : "/image/elseImage.png"}
          alt=""
        />
        <div className="flex flex-col gap-[10px]">
          <span className="text-[14px] text-white/50 leading-[14px]">
            {title}
          </span>
          <span className="text-[12px] text-white/50 leading-[14px]">
            {date &&
              new Date(parseInt(date))
                .toISOString()
                .split(".")[0]
                .replace("T", " - ")}{" "}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <img
          className="w-[30px] h-[30px] rounded-full"
          src={profilePic ? profilePic : "/image/profile.png"}
          alt=""
        />
        {status !== "unresolved" ? <CorrectIcon /> : <Xicon />}
      </div>
    </div>
  );
}
export default ZorchilList;
