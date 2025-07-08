// react
import { useLocation } from "react-router-dom";
// components
import FeedbackComponentList from "./FeedbackComponentList";
// graphql
import { useQuery } from "@apollo/client";
import { GET_VIOLATION_SEARCH_JSON } from "../graphql/queries";
// lottie
import Lottie from "lottie-react";
import loadingData from "../lottie/loading.json";
import loadingErrorData from "../lottie/loading-server-error.json";
// icons
import WarningMessengerIcon from "../assets/componentsSvg/adminsvg/warningMessengerIcon";
import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";

export default function FeedbackComponent({
  propertyId,
}: {
  propertyId?: string;
}) {
  const location = useLocation();
  const adminPath = ["/dashboard"];
  const admin = adminPath.includes(location.pathname);

  const { data, error, loading } = useQuery(GET_VIOLATION_SEARCH_JSON, {
    variables: admin
      ? {
          search: {},
          fetchPolicy: "cache-and-network",
        }
      : {
          search: {
            propertyId: localStorage.getItem("userId"),
          },
          fetchPolicy: "cache-and-network",
        },
  });

  const datas = data?.getViolations.filter(
    (item: any) => item.type === "violation"
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
    <div className="rounded-[18px] bg-black/10 overflow-hidden  w-full h-[360px]">
      <div className="bg-black/10 px-[20px] h-[56px] rounded-t-[18px] flex items-center justify-between ">
        <div className=" flex gap-[10px] text-white/90 items-center">
          <span>
            <WarningMessengerIcon />
          </span>
          <span className="text-[14px]"> Нийт зөрчил </span>
          <div className="p-[8px] flex items-center justify-center bg-white/15 rounded-[55px] text-[12px] leading-[14px] font-[500]">
            {datas && datas.length}
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
      <div className="p-[20px] h-[calc(100%-56px)]  ">
        <FeedbackComponentList data={datas} />
      </div>
    </div>
  );
}
