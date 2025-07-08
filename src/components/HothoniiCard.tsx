import CamereIcon from "../assets/componentsSvg/adminsvg/camereIcon";

function HothoniiCard({
  photo,
  name,
  peopleCount,
  guardCount,
}: {
  name?: any;
  photo?: any;
  peopleCount?: any;
  guardCount?: any;
}) {
  return (
    <div className="relative w-full h-full rounded-[18px] bg-white/10 px-[20px] ">
      <img
        src={photo ? photo : "/image/hothonizurag.png"}
        className="rounded-[18px] absolute top-0 left-0  w-full h-full object-cover bg-cneter"
        alt=""
      />
      <div className="absolute top-[32px] left-[50%] -translate-x-1/2 text-[30px] leading-[36px] text-white/80 whitespace-nowrap bg-white/20  rounded-lg backdrop-blur-[10px] px-[14px] py-2 ">
        {name}
      </div>
      <div className="mx-auto w-[272px] absolute top-[90px] left-[50%] -translate-x-1/2 h-[50px] rounded-[16px] bg-black/10 text-white/90 text-[14px]   whitespace-nowrap px-[16px] backdrop-blur-[78px] flex justify-between items-center">
        <div className="flex gap-[10px] items-center text-white/90 text-[14px]">
          <CamereIcon /> Нийт хамгаалагч
        </div>{" "}
        <div className="text-white/90 text-[14px]">{guardCount}</div>
      </div>
      <div className="mx-auto w-[272px] absolute top-[150px] left-[50%] -translate-x-1/2 h-[50px] rounded-[16px] bg-black/10 text-white/90 text-[14px]   whitespace-nowrap px-[16px] backdrop-blur-[78px] flex justify-between items-center">
        <div className="flex gap-[10px] items-center text-white/90 text-[14px]">
          <CamereIcon /> Нийт оршин суугч
        </div>{" "}
        <div className="text-white/90 text-[14px]">{peopleCount}</div>
      </div>
    </div>
  );
}
export default HothoniiCard;
