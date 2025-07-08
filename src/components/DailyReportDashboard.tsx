import { useContext } from "react";
import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import TailanSumIcon from "../assets/componentsSvg/adminsvg/tailanSumIcon";
import SearchIconNav from "../assets/componentsSvg/navigationIcons/SearchIconNav";
import ToirogshigIcon from "../assets/componentsSvg/navigationIcons/ToirogshigIcon";
import WarningIcon from "../assets/componentsSvg/warningIcon";
import DailyReportDashboardList from "./layouts/DailyReportDashboardList";
import DailyReportHeader from "./layouts/DailyReportHeader";
import { Radar } from "lucide-react";

const datas: any[] = [
  {
    number: 1,
    data: {
      date: "2025-05-20",
      sohName: "СХД, 3-р хороо, 12 байр",
      description: "Объектын эргэн тойронд аюулгүй байдал хангагдсан.",
      items: {
        notif: {
          value: "3",
        },
        zurchil: {
          value: "1",
        },
        dayStatus: {
          value: "Амар тайван",
          icon: <Radar className="text-green-500 w-3 h-3" />,
        },
      },
    },
  },
];
function DailyReportDashboard() {
  return (
    <div className="w-full h-full bg-black/10  rounded-[17px] overflow-hidden">
      <div className="bg-black/10 h-[56px] pl-[18px] pr-[6px]  flex items-center justify-between ">
        <div className="flex items-center gap-[8px] ">
          <ToirogshigIcon width="18px" height="18px" />
          <div className="text-white/90">Өдрийн тайлан</div>
          <div className="w-[35px] h-[24px] bg-white/10 text-white/30 flex justify-center items-center rounded-[55px]">
            0
          </div>
        </div>
        <div className="relative h-[44px] w-[272px] rounded-tl-[14px] rounded-bl-[14px] rounded-tr-[16px] rounded-br-[14px] bg-white/10">
          <div className="absolute top-[50%] -translate-y-1/2 left-[20px]">
            <SearchIconNav width="20px" height="20px" color="#80FFB7" />
          </div>
          <input
            type="text"
            placeholder="Хайлт хийх"
            className="absolute border-0 bg-transparent top-[50%] -translate-y-1/2 pl-[73px] text-white/90 w-full h-full rounded-tl-[14px] rounded-bl-[14px] rounded-tr-[16px] rounded-br-[14px]  focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
          />
        </div>
      </div>
      <div className="p-[20px] flex flex-col gap-[10px]">
        <DailyReportHeader />
        {datas &&
          datas.map((item, i) => (
            <DailyReportDashboardList data={item.data} number={item.number} />
          ))}
        {/* <div className="flex gap-[4px]">
            <div className="w-[36px] h-[36px] bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
              <TailanSumIcon />
            </div>
            <div className="w-[36px] h-[36px] bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
              1
            </div>
            <div className="w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
              2
            </div>
            <div className="w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
              3
            </div>
            <div className="w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
              ...
            </div>
            <div className="w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
              10
            </div>

            <div className="w-[36px] h-[36px] rotate-180 bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
              <TailanSumIcon />
            </div>
          </div> */}
      </div>
    </div>
  );
}
export default DailyReportDashboard;
