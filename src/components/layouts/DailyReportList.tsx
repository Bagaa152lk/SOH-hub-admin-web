
import CamereIcon from "../../assets/componentsSvg/adminsvg/camereIcon";
import ClockIcon from "../../assets/componentsSvg/adminsvg/clockIcon";
import MessageIconWarning from "../../assets/componentsSvg/adminsvg/messageIconWarning";
import DailyReportHourList from "./DailyReportHourList";
function DailyReportList() {


  return (
    <div className="h-[942px] w-full rounded-[16px] overflow-hidden bg-black/10">
      <div className="px-[18px] h-[56px] flex items-center justify-between custom-background">
        <div className="flex items-center gap-[8px]">
          <CamereIcon />
          <div className="text-white/90">Өнөөдрийн тайлан</div>
        </div>
      </div>
      <div className="p-[20px] flex flex-col gap-[10px] overflow-y-scroll  h-[886px]">
        <div className="rounded-[14px] bg-white/5 border border-white/10 min-h-[44px] flex items-center px-[16px] justify-between">
          <div className="flex items-center gap-[10px]">
            <MessageIconWarning />
            <span className="text-white/30">Нийт SOS мэдэгдэл</span>
          </div>
          <span className="text-white/90">32</span>
        </div>

        <div className="rounded-[14px] bg-white/5 border border-white/10  min-h-[44px] flex items-center px-[16px] justify-between">
          <div className="flex items-center gap-[10px]">
            <ClockIcon />
            <span className="text-white/30">Огноо</span>
          </div>
          <span className="text-white/90">2025.03.08</span>
        </div>

        <div>
          <div className="my-[6px] bg-white/15 w-full h-[1px]" />
        </div>

        <DailyReportHourList />
      </div>
    </div>
  );
}

export default DailyReportList;
