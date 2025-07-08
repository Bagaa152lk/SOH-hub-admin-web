import BaruunDeesheSum from "../../assets/componentsSvg/adminsvg/baruunDeesheSum";

function ClaimList() {
  return (
    <div className="border rounded-[14px] border-gray-400 duration-100 hover:border-[#80FFB7] h-[58px] w-full flex items-center pl-[16px] py-[13px] pr-[18px] justify-between cursor-pointer ">
      <div className="flex gap-[10px] items-center">
        <div className="w-[32px] h-[32px] flex justify-center items-center bg-gray-50/20 duration-100  hover:bg-gray-50/40 rounded-full">
          <BaruunDeesheSum />
        </div>
        <div>
          <span className="text-white/50">Нэхэмжилсэн:</span>{" "}
          <span className="text-white/90">Shield Nirun</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-[16px]">
          <div className="font-[400] text-white/90">2025.03.08</div>
          <div className="border-l-[1px] h-[18px] bg-black/16"></div>
          <div className="text-white/90 font-[500]">350’000.00</div>
        </div>
      </div>
    </div>
  );
}
export default ClaimList;
