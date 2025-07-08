import { ReactNode, useState } from "react";
import ToolIcon from "../assets/componentsSvg/toolIcon";
import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";
import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import Xicon from "../assets/componentsSvg/adminsvg/xIcon";
import UuregList from "./UuregList";
import { GET_REQUESTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

interface OgogdsonUuregProps {
  children?: ReactNode;
}

function OgogdsonUureg({ children }: OgogdsonUuregProps) {
  const [filterType, setFilterType] = useState("all");
  const { data, loading, error } = useQuery(GET_REQUESTS, {
    fetchPolicy: "cache-and-network",
  });
  const location = useLocation();
  const adminPath = ["/dashboard"];
  const admin = adminPath.includes(location.pathname);

  const datas = data?.getRequests;
  let realDatas;

  if (!admin) {
    realDatas = datas?.filter(
      (item: any) => item.propertyId._id === localStorage.getItem("userId")
    );
  } else {
    realDatas = datas;
  }
  const filteredData =
    filterType === "all"
      ? realDatas
      : realDatas?.filter((i: any) => filterType === i.status);

  return (
    <div className="bg-black/10 rounded-[18px] overflow-hidden  h-full flex flex-col gap-[20px]">
      <div className="px-[18px] min-h-[56px]  flex items-center justify-between bg-black/10">
        <div className="flex items-center gap-[8px]">
          <ToolIcon />
          <div className="text-white/90">Нийт үүрэг</div>
        </div>
        <a
          className="hover:scale-105 cursor-pointer"
          href={
            admin
              ? "/guard-task"
              : `/home-owner/${localStorage.getItem("userId")}/guard-task`
          }
        >
          <BaruunSum />
        </a>
      </div>
      <div className="min-h-[44px] grid grid-cols-2  gap-[10px] px-[20px]">
        <div
          onClick={() => setFilterType("resolved")}
          className="rounded-[14px] cursor-pointer  flex items-center justify-between px-[15px] border border-[#80FFB766] bg-[#80FFB714]"
        >
          <div className="text-white/60 text-[12px] leading-[12px]  flex items-center  gap-[5px]">
            <CorrectIcon />
            <p>Биелсэн</p>
          </div>
          <div className="text-white/80 text-[14px] ">
            {
              realDatas?.filter((item: any) => item.status === "resolved")
                .length
            }
          </div>
        </div>
        <div
          onClick={() => setFilterType("unresolved")}
          className="rounded-[14px] flex items-center cursor-pointer justify-between px-[15px] border border-[#F6C32466] bg-[#F6C32414]"
        >
          <div className="text-white/60 text-[12px] leading-[12px]  flex items-center  gap-[5px]">
            <Xicon /> <p>Биелээгүй</p>
          </div>
          <div className="text-white/80 text-[14px] ">
            {
              realDatas?.filter((item: any) => item.status === "unresolved")
                .length
            }
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-56px-44px-70px)]  overflow-y-auto pr-[20px] pl-[20px]  pb-[26px] flex flex-col gap-[10px] ">
        {children}
        {filteredData &&
          filteredData.map((item: any, i: number) => (
            <div key={i}>
              <UuregList
                title={item.title}
                date={item.createdAt}
                profilePic={item?.toUserId?.profilePic}
                status={item.status}
                propertyName={item.propertyId.name}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default OgogdsonUureg;
