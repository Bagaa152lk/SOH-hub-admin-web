import Maps from "../../components/Maps";
import SosAlert from "../../components/SosAlert";
import OgogdsonUureg from "../../components/OgogdsonUureg";
import WorkingEmployee from "../../components/WorkingEmployee";
import UuregList from "../../components/UuregList";
import FeedbackComponent from "../../components/FeedbackComponent";
import IlgeesenZorchil from "../../components/IlgeesenZorchil";
import ZorchilList from "../../components/ZorchilList";
import { GET_PROPERTIES, GET_PROPERTY_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loadingData from "../../lottie/loading.json";
import loadingErrorData from "../../lottie/loading-server-error.json";
import HothoniiCard from "../../components/HothoniiCard";
import { getPolygonCenter } from "../../utils/helpers";
function HomeOwnerDashboardTable() {
  const { id } = useParams();
  const pathCoordinates = [
    { lat: 47.91069388734274, lng: 106.91144382133898 },
    { lat: 47.907192709105544, lng: 106.90828252230948 },
    { lat: 47.90700522392261, lng: 106.91105113659091 },
  ];
  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
  });
  const myPropertyData = data?.getProperties.filter(
    (item: any) => item._id === id
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

  // const propertiesPolygons =
  //   data?.getProperties?.map((item: any) =>
  //     item.map.map((coord: any) => ({
  //       lat: coord.lat,
  //       lng: coord.long,
  //     }))
  //   ) || [];

  const maps = myPropertyData[0].map;
  const ce = getPolygonCenter("myCenter", maps);

  return (
    <div className="w-full grid grid-cols-10 gap-[20px] px-4 py-6">
      <div className="col-span-2 flex flex-col gap-[20px]">
        <div className="h-[562px]">
          <HothoniiCard
            name={myPropertyData[0]?.name}
            photo={myPropertyData[0]?.profilePic}
            peopleCount={myPropertyData[0]?.residentCount}
          />
        </div>
        <div className="col-span-8 2xl:col-span-2 flex-1 ">
          <div className="h-[360px]">
            <WorkingEmployee />
          </div>
        </div>
      </div>
      {/* Left/Main Section */}
      <div className="col-span-10 2xl:col-span-6 grid grid-cols-8  gap-[20px]">
        <div className="col-span-8 h-[300px] md:h-[400px] xl:h-[562px]">
          <Maps
            // drawTrack={pathCoordinates}
            propertiesData={myPropertyData}
            zoom={16}
            center={ce}
            markernone={false}
          />
        </div>

        <div className="col-span-8 grid grid-cols-8  gap-[20px]">
          <div className="col-span-8 2xl:col-span-5 flex-1">
            <FeedbackComponent
              propertyId={`${localStorage.getItem("userId")}`}
            />
          </div>
          <div className="col-span-8 2xl:col-span-3  flex-1 h-[360px]">
            <IlgeesenZorchil propertyId={`${localStorage.getItem("userId")}`} />
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

export default HomeOwnerDashboardTable;
