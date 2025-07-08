import { useQuery } from "@apollo/client";
import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";
import BaruunTiishHarsanSum from "../assets/componentsSvg/adminsvg/baruunTiishHarsanSum";
import WarningIconGurwaljin from "../assets/componentsSvg/warningIconGurwaljin";
import SosList from "./SosList";
import { GET_SOS } from "../graphql/queries";
import { useParams } from "react-router-dom";
function SosAlert() {
  const { data } = useQuery(GET_SOS);
  const sosData = data?.getsSos;
  const { id } = useParams();
  let sosFilteredData;
  if (id) {
    sosFilteredData = data?.getsSos.filter(
      (item: any) => item.propertyId._id === id
    );
  } else {
    sosFilteredData = sosData;
  }
  return (
    <div className="h-full w-full rounded-[18px] overflow-hidden bg-black/10 border border-[#F6C32466] ">
      <div className="px-[18px] h-[56px]  flex items-center justify-between bg-black/10">
        <div className="flex items-center gap-[8px]">
          <WarningIconGurwaljin />
          <div className="text-white/90">SOS мэдэгдэл</div>
        </div>
        <a href="/sos">
          <BaruunSum />
        </a>
      </div>
      <div className="p-[20px] h-[calc(100%-56px)]  ">
        <div className="h-full overflow-y-scroll overflow-x-hidden flex flex-col gap-[10px]">
          {sosFilteredData?.map((item: any) => (
            <SosList data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default SosAlert;
