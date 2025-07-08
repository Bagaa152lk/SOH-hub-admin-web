import { useNavigate } from "react-router-dom";
import FireIcon from "../assets/componentsSvg/adminsvg/fireIcon";
import { getIconAndLabelForAlarm } from "../helper/helper";

function SosList(data: any) {
  const { label, icon } = getIconAndLabelForAlarm(data?.data.alertId?.alarmStr);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/sos")}
      className="flex items-center bg-[#F6C32414] border-[1px] border-[#F6C32466] min-h-[100px] bg-[#585c60]  pr-[18px] pl-[17px] rounded-[14px]"
    >
      <div className="flex items-center gap-[11px]">
        {icon || <FireIcon />}
        <div className="flex flex-col ">
          <span className="text-[14px] leading-[14px] text-white/90">
            {label || "Гал гарсан"}
          </span>
          <div className="text-[12px] text-white/50 leading-[14px] flex flex-col gap-[10px] items-start">
            <span>
              {data?.data?.propertyId?.name} -
              {new Date(parseInt(data?.data?.createdAt)).toLocaleString(
                "mn-MN"
              )}
            </span>
            <div className="flex justify-center items-center rounded-[8px] h-[30px] px-[10px] py-[8px] bg-white/10 text-[12px] leading-[12px]">
              {data?.data?.propertyId?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SosList;
