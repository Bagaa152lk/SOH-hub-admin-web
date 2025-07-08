// react
import { useEffect } from "react";
// components
import Maps from "../../components/Maps";
import SosAlert from "../../components/SosAlert";
import OgogdsonUureg from "../../components/OgogdsonUureg";
import WorkingEmployee from "../../components/WorkingEmployee";
import FeedbackComponent from "../../components/FeedbackComponent";
import IlgeesenZorchil from "../../components/IlgeesenZorchil";
// import { useParams } from "react-router-dom";
// import ZorchilList from "../../components/ZorchilList";
// import UuregList from "../../components/UuregList";
// graphql
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES, ME } from "../../graphql/queries";
// lottie
import Lottie from "lottie-react";
import loadingData from "../../lottie/loading.json";
import loadingErrorData from "../../lottie/loading-server-error.json";

function DashboardTable() {
  const skipQuery = !localStorage.getItem("token");
  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
    skip: skipQuery,
  });
  const { data: meData } = useQuery(ME);

  useEffect(() => {
    if (meData?.me?._id) {
      localStorage.setItem("adminId", meData.me._id);
    }
  }, [meData?.me?._id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Token decode error", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

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
    <div className="w-full grid grid-cols-10 gap-[20px] px-4 py-6">
      {/* Left/Main Section */}
      <div className="col-span-10 2xl:col-span-8 grid grid-cols-8  gap-[20px]">
        <div className="col-span-8 h-[300px] md:h-[400px] xl:h-[562px] relative">
          <button
            onClick={() => (window.location.href = "/object-table")}
            className="absolute right-[80px] z-20 top-[15px] text-[14px] leading-[14px] text-white/70 uppercase duration-200 px-4 py-2 rounded-[16px] hover:text-white/100 hover:bg-green-300"
          >
            объект нэмэх
          </button>
          <div className="w-full h-full z-10">
            {" "}
            <Maps propertiesData={data?.getProperties} />
          </div>
        </div>
        <div className="col-span-8 grid grid-cols-8  gap-[10px]">
          <div className="col-span-8 2xl:col-span-2 flex-1 h-[360px]">
            <WorkingEmployee />
          </div>
          <div className="col-span-8 2xl:col-span-4 flex-1">
            <FeedbackComponent />
          </div>
          <div className="col-span-8 2xl:col-span-2  flex-1 h-[360px]">
            <IlgeesenZorchil />
          </div>
        </div>
      </div>
      {/* Right/Sidebar */}
      <div className="col-span-10 2xl:col-span-2 flex flex-col gap-[20px]">
        <div className="h-[300px] md:h-[400px] xl:h-[562px]">
          <SosAlert />
        </div>
        <div className="h-[360px]">
          <OgogdsonUureg />
        </div>
      </div>
    </div>
  );
}

export default DashboardTable;
