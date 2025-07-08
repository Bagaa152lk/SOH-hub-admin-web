import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";
import CamereIcon from "../assets/componentsSvg/adminsvg/camereIcon";
import HamgaalagchIcon from "../assets/componentsSvg/adminsvg/hamgaalagchIcon";
import CameraSmallCard from "./layouts/CameraSmallCard";

function CamereTable() {
  return (
    <div className="h-full w-full rounded-[16px] overflow-hidden camereBg">
      <div className="px-[18px] h-[56px] flex items-center justify-between custom-background">
        <div className="flex items-center gap-[16px]">
          <CamereIcon />
          <div className="text-[14px] w-[95px] text-white/90 whitespace-nowrap overflow-hidden overflow-ellipsis">
            Баруун хаалга
          </div>
        </div>
        <div>
          <button className="hover:scale-[102%] hover:bg-[#80ffb7] hover:backdrop-opacity-15 rounded-full p-[6px] duration-150 cursor-pointer ">
            <BaruunSum />
          </button>
        </div>
      </div>
      <div className="p-[20px] flex flex-col gap-[16px]">
        {/* grid-cols-1 xl:grid-cols-2 2xl: */}
        <div className="flex flex-wrap gap-[5px]">
          <CameraSmallCard />
          <CameraSmallCard />
          <CameraSmallCard />
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[10px] ">
          <div className="border border-white/10 rounded-[14px] px-[16px] h-[44px] flex items-center">
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-[8px]">
                <CamereIcon />
                <div className="text-[14px] leading-[14px] text-white/50">
                  Камер
                </div>
              </div>
              <div className="text-[14px] leading-[14px] text-white/90">3</div>
            </div>
          </div>
          <div className="border border-white/10 rounded-[14px] px-[16px] h-[44px] flex items-center">
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-[8px]">
                <HamgaalagchIcon />
                <div className="text-[14px] text-white/50">Ажилтан</div>
              </div>
              <div className="text-[14px] text-white/90">1</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white/15 text-[12px] h-[58px] flex items-center gap-[10px] text-white/90 px-[20px]">
        Ажилтан
        <div className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB7] relative ">
          <img
            className="w-full h-full rounded-full"
            src={"/image/profile.png"}
            alt=""
          />
          <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80FFB7] rounded-full" />
        </div>
        <div className="h-[26px] w-[1px] bg-white/30" />
        <div className="flex gap-[4px] items-center">
          <div className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB7] relative ">
            <img
              className="w-full h-full rounded-full"
              src={"/image/profile.png"}
              alt=""
            />
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80FFB7] rounded-full" />
          </div>
          <div className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB7] relative ">
            <img
              className="w-full h-full rounded-full"
              src={"/image/profile.png"}
              alt=""
            />
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80FFB7] rounded-full" />
          </div>
          <div className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB7] relative ">
            <img
              className="w-full h-full rounded-full"
              src={"/image/profile.png"}
              alt=""
            />
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80FFB7] rounded-full" />
          </div>
          <div className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB7] relative ">
            <img
              className="w-full h-full rounded-full"
              src={"/image/profile.png"}
              alt=""
            />
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80FFB7] rounded-full" />
          </div>
          <div className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB7] relative ">
            <img
              className="w-full h-full rounded-full"
              src={"/image/profile.png"}
              alt=""
            />
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80FFB7] rounded-full" />
          </div>
          <div className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB7] relative ">
            <img
              className="w-full h-full rounded-full"
              src={"/image/profile.png"}
              alt=""
            />
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80FFB7] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CamereTable;
