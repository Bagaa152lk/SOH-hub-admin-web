import DooshooZaasanSum from "../assets/componentsSvg/adminsvg/dooshooZaasanSum";

function SosTableHeader() {
  return (
    <div className="w-full overflow-auto">
      <div className="min-h-[44px] min-w-[1340px]  grid grid-cols-8 gap-[10px] items-center rounded-[14px] bg-black/10 px-[58px]">
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px] ">
          ХОТХОНЫ НЭР
          <DooshooZaasanSum />
        </div>
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px] ml-[20px]">
          ХҮСЭЛТИЙН ТӨРӨЛ <DooshooZaasanSum />
        </div>
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px] ml-[30px] ">
          УРТРАГ
          <DooshooZaasanSum />
        </div>
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px]  ">
          ӨРГӨРӨГ <DooshooZaasanSum />
        </div>
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px] -ml-[30px] ">
          SOS БОЛСОН ОГНОО
          <DooshooZaasanSum />
        </div>
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px] -ml-[20px] ">
          ДУУДЛАГЫН ТӨЛӨВ <DooshooZaasanSum />
        </div>
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px] -ml-[10px] ">
          SOS ТҮВШИН <DooshooZaasanSum />
        </div>
        <div className="text-[10px] whitespace-nowrap text-white/50 flex gap-[5px] -ml-[20px] ">
          ХОХИРОЛ <DooshooZaasanSum />
        </div>
      </div>
    </div>
  );
}
export default SosTableHeader;
