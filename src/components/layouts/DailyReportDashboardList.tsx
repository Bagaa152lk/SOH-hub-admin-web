import { useContext } from "react";
import BaruunSum from "../../assets/componentsSvg/adminsvg/baruunSumIcon";
import { DailyReportListPropsDataType } from "../../type/type";
import { useSelectedList } from "../../context/selectedListContext";

function DailyReportDashboardList({
  data,
  number,
}: DailyReportListPropsDataType) {
  const onClick = useSelectedList();

  return (
    <button
      onClick={() => onClick({ number, data })}
      className="px-[16px] py-[8px] rounded-[14px] bg-white/10 h-[58px] grid grid-cols-12 items-center gap-[8px] w-full"
    >
      {/* 1. Дугаар, зураг, огноо */}
      <div className="col-span-2 flex items-center gap-[10px]">
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-white/80 text-[10px] bg-white/10">
          {number}
        </span>
        <img
          className="w-8 h-8 rounded-2 overflow-hidden"
          src="/image/elseImage.png"
          alt=""
        />
        <span className="text-[14px] text-white/80">{data.date}</span>
      </div>

      {/* 2. Объектын нэр */}
      <div className="col-span-1">
        <span className="px-[14px] py-[8px] text-[12px] text-white/80 bg-white/10 rounded-[8px] block truncate">
          {data?.sohName}
        </span>
      </div>

      {/* 3. Description */}
      <div className="col-span-4">
        <span className="text-[14px] text-white/80 truncate block">
          {data?.description}
        </span>
      </div>
      <div className="col-span-1"></div>
      {/* 4. Мэдэгдэл */}
      <div className="col-span-1">
        <span className="px-[12px] py-[6px] text-[12px] text-white/80 bg-[#F6C32429] border border-[#F6C32466] rounded-[8px] block text-center">
          {data?.items?.notif?.value}
        </span>
      </div>

      {/* 5. Зөрчил */}
      <div className="col-span-1 ">
        <span className="px-[12px] py-[6px] text-[12px] text-white/80 bg-[#F6C32429] border border-[#F6C32466] rounded-[8px] block text-center">
          {data?.items?.zurchil?.value}
        </span>
      </div>

      {/* 6. Өдрийн төлөв */}
      <div
        className={`col-span-1 flex items-center gap-[4px] whitespace-nowrap px-[12px] py-[6px] text-[12px] text-white/80 rounded-[8px] truncate   ${
          data?.items?.dayStatus?.value === "Амар тайван"
            ? "bg-[#80FFB729]"
            : data?.items?.dayStatus?.value === "Анхаарах"
            ? "bg-[#F6C32429] text-black"
            : data?.items?.dayStatus?.value === "Эрдсэл үүссэн"
            ? "bg-[#F6C32429] text-white "
            : "bg-white/10"
        }`}
      >
        <div className="min-w-3 min-h-3">{data?.items?.dayStatus?.icon}</div>
        {data?.items?.dayStatus?.value}
      </div>

      {/* 7. Icon буюу сум */}
      <div className="col-span-1 flex justify-end">
        <BaruunSum />
      </div>
    </button>
  );
}

export default DailyReportDashboardList;
