import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import Xicon from "../assets/componentsSvg/adminsvg/xIcon";
import WindowIcon from "../assets/componentsSvg/windowIcon";

function UuregList({
  title,
  date,
  profilePic,
  status,
  propertyName,
}: {
  title?: string;
  date?: string;
  profilePic?: string | null;
  status?: string;
  propertyName?: string;
}) {
  return (
    <div
      className={`   pr-[18px] pl-[17px] rounded-[14px] ${
        status === "resolved"
          ? "bg-[#80FFB714] border-[1px] border-[#80FFB766]"
          : "border border-white/15"
      }`}
    >
      <div className="flex items-center min-h-[56px] justify-between">
        <div className="flex items-center gap-[11px]">
          <WindowIcon />
          <div className="flex flex-col gap-[10px]">
            <span className="text-[14px] text-white/50 leading-[14px]">
              {title || "Цонх шалгах"}
            </span>
            <span className="text-[12px] text-white/50 leading-[14px]">
              {date &&
                new Date(parseInt(date))
                  .toISOString()
                  .split(".")[0]
                  .replace("T", " - ")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <img
            className="w-[30px] h-[30px] rounded-full"
            src={profilePic ? profilePic : "/image/profile.png"}
            alt=""
          />
          {status === "resolved" ? (
            <CorrectIcon width="16px" height="16px" />
          ) : (
            <CorrectIcon width="16px" height="16px" color="#FFFFFF66" />
          )}
        </div>{" "}
      </div>
      <div className="w-full h-[1px] bg-white/10 "></div>
      <div className=" text-[12px] flex items-center justify-between py-[14px]">
        <p className="text-white/40">Хариуцсан</p>
        <p className="text-white/80">{propertyName}</p>
      </div>
    </div>
  );
}
export default UuregList;
