import BaruunDeesheSum from "../assets/componentsSvg/adminsvg/baruunDeesheSum";
import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";
import ClaimList from "./layouts/ClaimList";
function Claim() {
  return (
    <div className="w-full overflow-hidden h-[230px] bg-black/10 rounded-[16px] ">
      <div className="px-[18px] h-[56px] flex items-center justify-between custom-background">
        <div className="flex items-center gap-[16px]">
          <BaruunDeesheSum />
          <div className="text-white text-[14px]">Нэхэмжилэл</div>
        </div>
        <button>
          <BaruunSum />
        </button>
      </div>
      <div className="pl-[20px] pt-[20px] pr-[20px] pb-[28px] flex flex-col gap-[16px]">
        <ClaimList />
        <ClaimList />
      </div>
    </div>
  );
}
export default Claim;
