import {
  GoogleMap,
  Marker,
  OverlayView,
  Polygon,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useRef, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import CamereIcon from "../assets/componentsSvg/adminsvg/camereIcon";
import SearchIcon from "../assets/componentsSvg/adminsvg/searchIcon";
import { getPolygonCentere } from "../utils/helpers";
import Lottie from "lottie-react";
import loadingMap from "../lottie/loading-maps.json";
import marker from "../assets/marker/marker.svg";
import { useQuery } from "@apollo/client";
import {
  GET_TIME_ENTRIES_SEARCH_JSON,
  GET_VIOLATION_SEARCH_JSON,
} from "../graphql/queries";
import WarningIcon from "../assets/componentsSvg/warningIcon";
import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";

export default function Maps({
  center,
  zoom,
  markernone,
  propertiesData,
  createPolygon,
  setPolygons,
  polygons,
  setDonePolygon,
  drawTrack,
}: {
  drawTrack?: any;
  markernone?: any;
  center?: any;
  zoom?: any;
  propertiesData?: any;
  createPolygon?: boolean;
  setPolygons?: any;
  polygons?: any;
  setDonePolygon?: any;
}) {
  const location = useLocation();
  const hideSidebarRoutes = ["/create-new-hothon", "/select-hothon"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  // const
  const position = { lat: 47.918813386129116, lng: 106.9175908631341 };
  const mapRef = useRef<any>(null);
  const isHomeOwnerPage = matchPath("/home-owner/:id/*", location.pathname);

  const onLoad = (map: any) => {
    map.setMapTypeId("satellite");
    mapRef.current = map;
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || " ",
  });

  // Дата татах
  const { data: allViolationsData } = useQuery(GET_VIOLATION_SEARCH_JSON, {
    fetchPolicy: "cache-and-network",
  });
  const { data: timeEntries } = useQuery(GET_TIME_ENTRIES_SEARCH_JSON, {
    variables: { search: { status: "checkedIn" }, fetchPolicy: "network-only" },
  });

  // Object бүрт харгалзах зөрчил ба харуулууд
  const getViolationByPropertyId = (propertyId: string) => {
    const workingGuards =
      timeEntries?.getTimeEntries?.filter(
        (item: any) => item?.propertyId?._id === propertyId
      ) || [];

    const zorchil =
      allViolationsData?.getViolations?.filter(
        (v: any) => v?.propertyId?._id === propertyId && v?.type === "violation"
      ) || [];

    return { workingGuards, zorchil };
  };

  const processedPolygons =
    propertiesData?.map((item: any) => {
      const polygon = item.map.map((coord: any) => ({
        lat: coord.lat,
        lng: coord.long,
      }));

      const center = getPolygonCentere(item.id, polygon);

      return {
        id: item.id,
        polygon,
        center,
        data: item,
      };
    }) || [];

  return (
    <div className="h-full w-full relative">
      {/* Polygon mode товчлуурууд */}
      {createPolygon && (
        <>
          <button
            className="absolute top-[150px] left-[50px] bg-white/80 backdrop-blur-lg z-[999] px-[20px] py-[10px] rounded-[14px]"
            onClick={() => {
              setPolygons((prev: any) => prev.slice(0, -1));
            }}
          >
            Сүүлчийн цэг арилгах
          </button>
          <button
            className="absolute top-[200px] left-[50px] bg-green-500/70 text-white backdrop-blur-lg z-[999] px-[20px] py-[10px] rounded-[14px]"
            onClick={() => setDonePolygon(false)}
          >
            Болсон
          </button>
        </>
      )}

      {/* Хайлтын хэсэг */}
      <div className="w-full h-[56px] rounded-t-[18px] bg-black/10 flex items-center justify-between px-[20px]">
        <div className="flex gap-[5px] items-center text-white/90">
          <CamereIcon /> {!createPolygon ? "Нийт объект" : "Цэг хатгах"}
        </div>
        {!createPolygon && <SearchIcon />}
      </div>

      {/* Газрын зураг */}
      <div className="relative w-full h-[calc(100%-56px)] overflow-hidden bg-black/10">
        {!isLoaded ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <Lottie
              animationData={loadingMap}
              loop
              style={{ width: 150, height: 150 }}
            />
            <div className="text-white/80 text-[16px]">
              Газрын зураг уншиж байна...
            </div>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
            center={
              center
                ? center
                : !createPolygon
                ? position
                : polygons.length > 0
                ? polygons[polygons.length - 1]
                : position
            }
            zoom={zoom ? zoom : 13}
            onLoad={onLoad}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
            onClick={(e) => {
              if (createPolygon) {
                const lat = e.latLng?.lat();
                const long = e.latLng?.lng();
                setPolygons((prev: any) => [...prev, { lat, long }]);
              }
            }}
          >
            {drawTrack && drawTrack.length > 1 && (
              <Polyline
                path={drawTrack}
                options={{
                  geodesic: true,
                  strokeColor: "#F6C324",
                  strokeOpacity: 0.8,
                  strokeWeight: 5,
                  zIndex: 2,
                }}
              />
            )}
            {/* Marker тавих */}
            {!isHomeOwnerPage
              ? !createPolygon &&
                processedPolygons.map((item: any, i: number) => {
                  if (!item.center) return null;

                  const datas = getViolationByPropertyId(item.data._id);

                  return (
                    <div className="relative group" key={i}>
                      <Marker
                        position={{
                          lat: item.center.lat,
                          lng: item.center.lng,
                        }}
                        icon={{
                          url: marker,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        onMouseOver={() => setHoveredIndex(i)}
                        onMouseOut={() => setHoveredIndex(null)}
                        onClick={() => {
                          // window.location.href = `/home-owner/${item.data._id}`;
                          navigate(`/home-owner/${item.data._id}`);
                          localStorage.setItem("userId", item.data._id);
                        }}
                      />
                      {hoveredIndex === i && (
                        <OverlayView
                          position={{
                            lat: item.center.lat,
                            lng: item.center.lng,
                          }}
                          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                          <div className="flex rounded-[14px]  bg-black/10 backdrop-blur-[78px] border-[#80FFB766] shadow p-[10px] z-[1000] border text-white/80 items-center justify-between w-[338px]">
                            <div className=" flex gap-2">
                              <div className="w-[38px] h-[38px] rounded-full bg-[#00A8A5] flex items-center justify-center">
                                {item.data.name?.slice(0, 1)}
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="text-[14px] leading-[14px]">
                                  {item.data.name}
                                </div>
                                <div className="text-[12px] text-white/40 flex items-center gap-1">
                                  <WarningIcon /> Зөрчил{" "}
                                  {datas?.zorchil?.length || 0}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 pl-2 items-center">
                              {datas?.workingGuards?.map(
                                (guard: any, idx: number) => (
                                  <div className="relative" key={idx}>
                                    <img
                                      src={
                                        guard.userId?.profilePic ||
                                        "/image/profile.png"
                                      }
                                      alt={guard.userId?.firstName || "guard"}
                                      className="w-8 h-8 rounded-full object-cover border border-[#80FFB766]"
                                    />
                                    <div className="w-2 h-2 absolute bottom-0 right-0 rounded-full bg-[#80FFB7CC] " />
                                  </div>
                                )
                              )}
                              <BaruunSum />
                            </div>
                          </div>
                        </OverlayView>
                      )}
                    </div>
                  );
                })
              : null}

            {/* Polygon зурж байгаа эсэхээс шалтгаалж */}
            {!createPolygon
              ? processedPolygons.map((item: any, i: number) => (
                  <Polygon
                    key={i}
                    paths={item.polygon}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                    }}
                  />
                ))
              : polygons.length > 1 && (
                  <Polygon
                    paths={polygons.map((p: any) => ({
                      lat: p.lat,
                      lng: p.long,
                    }))}
                    options={{
                      strokeColor: "#80FFB766",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                    }}
                  />
                )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
