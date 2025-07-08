import { ReactNode } from "react";

import BaruunsumBultsgar from "../assets/componentsSvg/adminsvg/baruunsumBultsgar";
interface ZorchilItem {
  id?: string;
  zorchilType?: string;
  icon?: ReactNode;
  zorchilCount?: number;
}
interface ZothonMember {
  id?: string;
  img_url?: string;
  isOnline?: boolean;
}
interface Props {
  data?: {
    id?: string;
    hothonName?: string;
    hothonImage_url?: string;
    zorchilData?: ZorchilItem[];
    hothonMember?: ZothonMember[];
  };
  onClick?: () => void;
}

export default function SelectHothonTableList({ data, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-white/10 h-[70px] px-[16px] rounded-[14px] flex items-center hover:scale-95 duration-150 hover:ring-[#80FFB7] hover:ring-1 "
    >
      <div className="flex items-center gap-[40px]">
        <div className="flex items-center gap-[10px]">
          <div className="bg-[#00A870] w-[38px] h-[38px] rounded-full flex justify-center items-center font-[600] text-[16px] text-white/90">
            {data?.hothonName?.charAt(0)}
          </div>

          <div>
            <h1 className="flex justify-start text-[14px] text-white/90">
              {data?.hothonName || "Selbe hothon"}
            </h1>
            <p className="flex flex-wrap gap-[0px] md:gap-[9px]">
              {data?.zorchilData?.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-[5px] text-[12px] text-white/60 whitespace-nowrap"
                >
                  {item?.icon && <span>{item.icon}</span>}
                  {item?.zorchilType || "Гадны хүн"} {item?.zorchilCount || 0}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[4px]">
          <div className=" items-center hidden md:flex">
            <div className="relative">
              <img
                src="/image/profile.png"
                className="w-[26px] h-[26px] rounded-full border border-[#80ffb7]"
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80ffb7] rounded-full"></div>
            </div>
            <div className="relative">
              <img
                src="/image/profile.png"
                className="w-[26px] h-[26px] rounded-full border border-[#80ffb7]"
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80ffb7] rounded-full"></div>
            </div>
            <div className="relative">
              <img
                src="/image/profile.png"
                className="w-[26px] h-[26px] rounded-full border border-[#80ffb7]"
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 w-[8px] h-[8px] bg-[#80ffb7] rounded-full"></div>
            </div>
          </div>
          <div className=" ml-[10px] hidden md:flex">
            <BaruunsumBultsgar />
          </div>
        </div>
      </div>
    </button>
  );
}
