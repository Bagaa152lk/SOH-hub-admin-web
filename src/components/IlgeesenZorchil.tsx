import { ReactNode } from "react";
import WarningMessengerIcon from "../assets/componentsSvg/adminsvg/warningMessengerIcon";
import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";
import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import Xicon from "../assets/componentsSvg/adminsvg/xIcon";
import ZorchilList from "./ZorchilList";
import { useQuery } from "@apollo/client";
import { GET_VIOLATION_SEARCH_JSON } from "../graphql/queries";
import { useLocation } from "react-router-dom";
// lottie
import Lottie from "lottie-react";
import loadingData from "../lottie/loading.json";
import loadingErrorData from "../lottie/loading-server-error.json";
interface OgogdsonUuregProps {
  children?: ReactNode;
  title?: string;
  propertyId?: string;
}

function IlgeesenZorchil({ children, propertyId }: OgogdsonUuregProps) {
  const location = useLocation();
  const adminPath = ["/dashboard"];
  const admin = adminPath.includes(location.pathname);

  const { data, error, loading } = useQuery(GET_VIOLATION_SEARCH_JSON, {
    variables: admin
      ? {
          search: {},
        }
      : {
          search: {
            propertyId: propertyId || null,
          },
        },
    fetchPolicy: "cache-and-network",
  });

  const datas = data?.getViolations || [];
  const permissionDatas = datas.filter(
    (item: any) => item.type === "permission"
  );
  if (loading)
    return (
      <div className="w-full h-screen overflow-hidden flex items-center justify-center">
        <Lottie
          animationData={loadingData}
          loop
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-screen overflow-hidden bg-black/30">
        <Lottie
          animationData={loadingErrorData}
          loop
          style={{ width: 150, height: 150 }}
        />
        <h1>{error.message}</h1>
      </div>
    );
  return (
    <div className="bg-black/10 rounded-[18px] overflow-hidden w-full h-full flex flex-col gap-[20px]">
      <div className="px-[18px] min-h-[56px]  flex items-center justify-between bg-black/10">
        <div className="flex items-center gap-[8px]">
          <WarningMessengerIcon />
          <div className="text-white/90 text-[14px]">Зөвшөөрөл</div>
          <div className="p-[8px] flex items-center justify-center text-white/90 bg-white/15 rounded-[55px] text-[12px] leading-[14px] font-[500]">
            {permissionDatas && permissionDatas.length}
          </div>
        </div>

        <a
          href={
            admin
              ? "/permission"
              : `/Home-owner/${localStorage.getItem("userId")}/permission`
          }
        >
          <BaruunSum />
        </a>
      </div>
      <div className="min-h-[44px] grid grid-cols-2  gap-[10px] px-[20px]">
        <div className="rounded-[14px]  flex items-center justify-between px-[15px] border border-[#80FFB766] bg-[#80FFB714]">
          <div className="text-white/60 text-[12px] leading-[12px]  flex items-center  gap-[5px]">
            <CorrectIcon />
            <p>Баталсан</p>
          </div>
          <div className="text-white/80 text-[14px] ">
            {
              permissionDatas.filter((item: any) => item.status === "resolved")
                .length
            }
          </div>
        </div>
        <div className="rounded-[14px] flex items-center justify-between px-[15px] border border-[#F6C32466] bg-[#F6C32414]">
          <div className="text-white/60 text-[12px] leading-[12px]  flex items-center  gap-[5px]">
            <Xicon /> <p>Цуцалсан</p>
          </div>
          <div className="text-white/80 text-[14px] ">
            {
              permissionDatas.filter(
                (item: any) => item.status === "unresolved"
              ).length
            }
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-56px-44px-70px)]  overflow-y-auto pr-[20px] pl-[20px]  pb-[26px] flex flex-col gap-[10px] ">
        {children}
        {permissionDatas &&
          permissionDatas.map((item: any) => (
            <ZorchilList
              title={item.title}
              date={item.createdAt}
              status={item.status}
              imgUrl={item.image}
              profilePic={item?.userId?.profilePic}
            />
          ))}
      </div>
    </div>
  );
}

export default IlgeesenZorchil;
