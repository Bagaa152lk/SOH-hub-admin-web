import { useQuery } from "@apollo/client";
import ClockIcon from "../assets/componentsSvg/adminsvg/clockIcon";
import ActiveGuard from "./ActiveGuardList";
import { GET_TIME_ENTRIES_SEARCH_JSON } from "../graphql/queries";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loadingData from "../lottie/loading.json";
import loadingErrorData from "../lottie/loading-server-error.json";
export default function WorkingEmployee() {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_TIME_ENTRIES_SEARCH_JSON, {
    variables: {
      search: { propertyId: id, status: "checkedIn" },
      fetchPolicy: "cache-and-network",
    },
  });

  const workingEmployeeGuards = data?.getTimeEntries || [];
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
    <div className="bg-black/10 rounded-[18px] overflow-hidden w-full h-full">
      <div className="bg-black/10 px-[20px] h-[56px] rounded-t-[18px] flex items-center justify-between ">
        <div className=" flex gap-[10px] text-white/90 items-center">
          <span>
            <ClockIcon color="white" width="18" height="18" />
          </span>
          Одоо ажиллаж буй
        </div>
      </div>
      <div className=" h-[calc(100%-56px)] overflow-y-auto flex flex-col gap-[10px] px-[20px] py-[20px] ">
        {workingEmployeeGuards ? (
          workingEmployeeGuards?.map((item: any, i: number) => (
            <div key={i}>
              <ActiveGuard
                name={`${item.userId.lastname} ${item.userId.firstname}`}
                checkedInTime={item.checkInTime}
                profilePic={item.userId.profilePic}
              />
            </div>
          ))
        ) : (
          <div className="text-white/50">
            Одоогоор ажилтан ажиллахгүй байна.
          </div>
        )}
      </div>
    </div>
  );
}
