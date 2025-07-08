import ObjectPlusIcon from "../../assets/componentsSvg/adminsvg/objectPlusIcon";

export default function ZuragInput() {
  return (
    <div className=" min-w-[272px] h-[154px] rounded-[16px] border-[1px] border-[#80ffb7] border-opacity-30 bg-white/10 flex flex-col items-center justify-center gap-[15px]">
      <ObjectPlusIcon />
      <div className="flex flex-col items-center">
        <div className="text-[12px] text-center text-white/90">
          Drag and drop here to upload
        </div>
        <div className="text-[10px] text-white/30">png, jpg up to 5MB</div>
      </div>
    </div>
  );
}
