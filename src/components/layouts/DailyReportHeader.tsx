import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";

function DailyReportHeader() {
  return (
    <div className="h-[44px]  grid grid-cols-7 items-center rounded-[14px] bg-black/10 ">
      <div className="col-span-4 grid grid-cols-4">
        <div className="text-[10px] text-white/50 flex gap-[5px] ml-[100px]">
          ОГНОО
          <DooshooZaasanSum />
        </div>
        <div className="text-[10px] text-white/50 flex gap-[5px] ml-[20px]">
          ТАЙЛБАР <DooshooZaasanSum/>
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-3">
        <div className="text-[10px] text-white/50 flex gap-[5px] ml-[100px] ">
          SOS МЭДЭГДЭЛ
          <DooshooZaasanSum />
        </div>
        <div className="text-[10px] text-white/50 flex gap-[5px] ml-[50px] ">
          ЗӨРЧЛИЙН ТОО
          <DooshooZaasanSum />
        </div>
        <div className="text-[10px] text-white/50 flex gap-[5px] ">
          ӨДРИЙН СТАТУС
          <DooshooZaasanSum />
        </div>
      </div>
    </div>
  );
}
export default DailyReportHeader;
