import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";

function ClaimdashboardListHeader() {
  return (
    <div className="bg-black/10 rounded-[14px]  grid grid-cols-2 py-[20px] px-[50px]">
      <div className="col-span-1 grid grid-cols-4 gap-[70px]">
        <div className="text-[10px] text-white/50 flex gap-[6px]">
          <span className="whitespace-nowrap">Нэхэмжилсэн</span>{" "}
          <DooshooZaasanSum />{" "}
        </div>
        <div className="text-[10px] text-white/50 whitespace-nowrap flex gap-[6px]">
          ТӨЛБӨР ОГНОО <DooshooZaasanSum />{" "}
        </div>
        <div className="text-[10px] text-white/50 flex gap-[6px] whitespace-nowrap">
          ХУГАЦАА ХЭТЭРСЭН <DooshooZaasanSum />{" "}
        </div>
        <div className="text-[10px] text-white/50 flex gap-[6px] whitespace-nowrap">
          НИЙТ ТӨЛӨХ ДҮН <DooshooZaasanSum />{" "}
        </div>
      </div>
      <div className="col-span-1 grid grid-cols-2">
        <div />
        <div className="text-[10px]  text-white/50  gap-[6px] grid grid-cols-2 whitespace-nowrap">
          <span className="flex justify-center gap-[6px]">
            {" "}
            ТӨЛБӨРИЙН СТАТУС <DooshooZaasanSum />{" "}
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
export default ClaimdashboardListHeader;
