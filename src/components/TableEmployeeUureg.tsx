import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import { EmployeeUuregButtonType } from "../type/type";

function TableEmployeeUureg({ img_url, name }: EmployeeUuregButtonType) {
  return (
    <div className="w-full h-[50px] flex items-center pr-[15px] pb-[6px] pt-[6px] pl-[6px] bg-white/10 rounded-[14px]">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[5px] relative">
          <img
            className="w-[30px] h-[30px] rounded-full"
            src={img_url}
            alt="profileImage"
          />
          <div className="absolute rounded-full left-[22px] top-[70%] bg-[#80FFB7] w-[8px] h-[8px]" />
          <div className="text-white/90 flex items-center justify-center leading-[14px] text-[12px]">
            {name}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <CorrectIcon />
        </div>
      </div>
    </div>
  );
}

export default TableEmployeeUureg;
