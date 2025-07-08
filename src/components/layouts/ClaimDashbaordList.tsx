import BaruunDeesheSum from "../../assets/componentsSvg/adminsvg/baruunDeesheSum";
import BaruunSum from "../../assets/componentsSvg/adminsvg/baruunSumIcon";
import CorrectIcon from "../../assets/componentsSvg/adminsvg/correctIcon";


function ClaimDashboardList() {
  return (
    <div className="bg-white/10 rounded-[14px]  grid grid-cols-2 px-[20px] py-[10px] items-center ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[10px]">
          {" "}
          <div className="w-[32px] custom-background h-[32px] rounded-full flex items-center justify-center ">
            <BaruunDeesheSum width="14px" height="14px" />
          </div>
          <span className="text-[14px] leading-[14px] font-[400] text-white/90">
            Shield Nirun{" "}
          </span>
        </div>{" "}
        <span className="text-[14px] leading-[14px] font-[400] text-white/90">
          2025.03.08{" "}
        </span>
        <span className="px-[14px] py-[8px] rounded-[8px] bg-[#F6C32429] text-white/90 text-center">
          3 хоног{" "}
        </span>
        <span className="text-[14px] leading-[14px] font-[400] text-white/90">
          350,000.00
        </span>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="w-full h-full"></div>
        <div className="col-span-1 flex items-center justify-between ">
          <span className="px-[14px] py-[8px] flex items-center gap-[4px] rounded-[8px] bg-[#F6C32429] text-white/90">
            <CorrectIcon />
            <span className="text-white/90">Төлбөр төлөгдөөгүй</span>
          </span>
          <BaruunSum />
        </div>
      </div>
    </div>
  );
}
export default ClaimDashboardList;
