import { useState } from "react";
import CamereIcon from "../../assets/componentsSvg/adminsvg/camereIcon";
import SearchIcon from "../../assets/componentsSvg/adminsvg/searchIcon";
import WarningMessengerIcon from "../../assets/componentsSvg/adminsvg/warningMessengerIcon";
import IlgeesenZorchil from "../../components/IlgeesenZorchil";
import SosAlert from "../../components/SosAlert";
import SosReportList from "../../components/SosReportList";
import SosTableHeader from "../../components/SosTableHeader";
import ZorchilList from "../../components/ZorchilList";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Lottie from "lottie-react";
import loadingMap from "../../lottie/loading-maps.json";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROPERTY_ID, GET_SOS, GET_VIOLATION } from "../../graphql/queries";
import { InfoWindow } from "@react-google-maps/api";
import Location from "../../assets/componentsSvg/adminsvg/location";

export default function SosTable() {
  // State нэмэх
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [showMaps, setShowMaps] = useState(false);
  const [selectedSos, setSelectedSos] = useState<any>(null);
  // const { data, loading, error } = useQuery(GET_VIOLATION, {
  //   fetchPolicy: "cache-and-network",
  // });

  const { data: sosData } = useQuery(GET_SOS, { variables: { search: {} } });
  const sossData = sosData?.getsSos;
  // const datas = data?.getViolations?.filter(
  //   (v: any) => v.propertyId && v.propertyId.name
  // );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "bhguebhgu2",
  });

  function handleClick(data: any) {
    setSelectedSos(data);
    // getProperty({ variables: { _id: data.propertyId._id } });
    // const sideData = { datas, propertyData };
  }
  const defaultCenter = { lat: 47.92061937559272, lng: 106.91725743094054 };

  return (
    // <div>sos</div>
    <div className="grid grid-cols-10 w-full h-full gap-[20px] px-4">
      <div className="col-span-10 2xl:col-span-8 flex flex-col gap-[20px]">
        <div className="w-full h-[942px] overflow-hidden rounded-[18px] bg-black/10">
          <div className="w-full h-[56px] flex justify-between items-center px-[18px] bg-black/10">
            <div className="flex items-center gap-[8px]">
              <WarningMessengerIcon />
              <div className="text-white/90 text-[14px] leading-[14px]">
                Нийт SOS
              </div>
              <div className="rounded-[55px] bg-white/15 text-white/50 text-[12px] font-[500] px-[15px] py-[3px]">
                {sossData ? sossData.length : 0}
              </div>
            </div>
            <div className="flex gap-[10px] items-center">
              <button
                onClick={() => setShowMaps(false)}
                className={`text-[12px] px-[16px] h-[32px] rounded-[8px] text-white/80 ${
                  !showMaps
                    ? "border border-[#80FFB766] bg-[#80FFB714]"
                    : "bg-white/10"
                }`}
              >
                Жагсаалтаар
              </button>
              <button
                onClick={() => setShowMaps(true)}
                className={`text-[12px] px-[16px] h-[32px] rounded-[8px] text-white/80 ${
                  showMaps
                    ? "border border-[#80FFB766] bg-[#80FFB714]"
                    : "bg-white/10"
                }`}
              >
                Газрын зургаар
              </button>
              <SearchIcon />
            </div>
          </div>

          {/* MAP / LIST */}
          {showMaps ? (
            <div className="w-full h-[calc(100%-56px)]">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderBottomLeftRadius: "15px",
                    borderBottomRightRadius: "15px",
                  }}
                  center={defaultCenter}
                  zoom={13}
                >
                  {/* {datas?.map((data: any, index: number) => {
                    const pin = {
                      lat: parseFloat(data.location.lat),
                      lng: parseFloat(data.location.long),
                    };

                    return (
                      <Marker
                        key={index}
                        position={pin}
                        onLoad={(marker) => {
                          const label = document.createElement("div");
                          label.innerHTML = `
                                              <div style="background:#000000">
                                              <div style="
                                                background: #F6C32429;
                                                color: white;
                                                padding: 6px 10px;
                                                border-radius: 8px;
                                                font-size: 12px;
                                                max-width: 200px;
                                              ">
                                                <strong>${data?.description}</strong><br/>
                                                ${new Date(data?.createdAt).toLocaleString("mn-MN", {
                                                  year: "numeric",
                                                  month: "2-digit",
                                                  day: "2-digit",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                  hour12: false,
                                                })}-${data.propertyId?.name || "Үл мэдэгдэх байршил"}


                                              </div></div>
                                            `;

                          const info = new window.google.maps.OverlayView();
                          info.onAdd = function () {
                            const panes = this.getPanes();
                            if (panes && panes.overlayLayer) {
                              panes.overlayLayer.appendChild(label);
                            }
                          };
                          info.draw = function () {
                            const projection = this.getProjection();
                            const position = projection.fromLatLngToDivPixel(
                              new window.google.maps.LatLng(pin.lat, pin.lng)
                            );
                            if (label && position) {
                              label.style.position = "absolute";
                              label.style.left = position.x + "px";
                              label.style.top = position.y + "px";
                            }
                          };
                          info.setMap(marker.getMap());
                        }}
                      />
                    );
                  })} */}
                </GoogleMap>
              ) : (
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
              )}
            </div>
          ) : (
            <div className="w-full p-[20px] flex flex-col gap-[10px] h-[calc(100%-56px)] overflow-y-auto">
              <SosTableHeader />
              <div className="flex flex-col gap-[10px] h-[calc(100%-80px)] overflow-y-auto">
                {sossData?.map((item: any, i: any) => (
                  <SosReportList
                    onClick={() => {
                      handleClick(item);
                    }}
                    key={i}
                    data={item}
                    number={i + 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-10 2xl:col-span-2 h-[942px]">
        {selectedSos ? (
          <div className="w-full h-[884px] relative bg-black/15 rounded-[18px] overflow-hidden flex flex-col">
            <div className="px-[18px] h-[56px] flex items-center justify-between bg-black/15">
              <div className="flex items-center gap-[16px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 9C0 4.02943 4.02943 0 9 0C13.9706 0 18 4.02943 18 9C18 13.9706 13.9706 18 9 18C4.02943 18 0 13.9706 0 9ZM7.52136 5.6057C7.48624 5.10924 7.70886 4.62091 8.19153 4.49958C8.41109 4.44439 8.68056 4.40426 9 4.40426C9.31944 4.40426 9.58891 4.44439 9.80843 4.49958C10.2911 4.62091 10.5138 5.10924 10.4786 5.6057C10.4056 6.63817 10.2661 8.43155 10.1153 9.43675C10.0657 9.76791 9.8663 10.0528 9.53609 10.1085C9.39489 10.1323 9.21815 10.1489 9 10.1489C8.78186 10.1489 8.60511 10.1323 8.46391 10.1085C8.1337 10.0528 7.93432 9.76791 7.88465 9.43675C7.73387 8.43155 7.59443 6.63817 7.52136 5.6057ZM10.3404 12.6383C10.3404 13.3786 9.7403 13.9787 9 13.9787C8.2597 13.9787 7.65957 13.3786 7.65957 12.6383C7.65957 11.898 8.2597 11.2979 9 11.2979C9.7403 11.2979 10.3404 11.898 10.3404 12.6383Z"
                    fill="white"
                    fill-opacity="0.8"
                  />
                </svg>
                <div className="text-white/90">Зөрчлийн тайлбар</div>
              </div>

              <div className="flex items-center gap-[10px]">
                <button
                  className="scale-110 text-[12px] underline text-white/80"
                  onClick={() => {
                    setSelectedSos(null);
                  }}
                >
                  {/* <ChatShigIcon opacity="0.3" /> */}
                  Буцах
                </button>
              </div>
            </div>
            <div className="pt-[24px] pb-[24px] px-[20px] flex flex-col items-center">
              <div className="w-full flex flex-col gap-[16px]">
                <div className="grid grid-cols-2 gap-[10px]">
                  <div className="col-span-2 h-[44px] text-white/80 bg-white/10 rounded-[14px] px-[16px] flex items-center gap-[10px]">
                    <Location />-
                  </div>
                  <div className="col-span-2 h-[44px] text-white/80 bg-white/10 rounded-[14px] px-[16px] flex items-center gap-[10px]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.0995 13.9006C0.699179 12.5001 0 10.4794 0 8C0 5.52056 0.699179 3.4998 2.0995 2.0995C3.4998 0.699178 5.52056 0 8 0C10.4794 0 12.5001 0.699178 13.9006 2.0995C15.3009 3.4998 16 5.52056 16 8C16 10.4794 15.3009 12.5001 13.9006 13.9006C12.5001 15.3009 10.4794 16 8 16C5.52056 16 3.4998 15.3009 2.0995 13.9006ZM8.19796 3.13786C8.13494 3.12043 8.06856 3.11111 8 3.11111C7.93144 3.11111 7.86506 3.12043 7.80205 3.13786C7.06203 3.3273 6.3626 3.77502 5.84659 4.29103C5.34898 4.78865 4.88889 5.4865 4.88889 6.22222C4.88889 6.63132 5.22053 6.96296 5.62963 6.96296C6.03873 6.96296 6.37037 6.63132 6.37037 6.22222C6.37037 6.06906 6.50287 5.72987 6.89415 5.3386C7.00699 5.22575 7.13013 5.1203 7.25926 5.02511V10.9749C7.13013 10.8797 7.00699 10.7742 6.89415 10.6614C6.50289 10.2701 6.37037 9.93094 6.37037 9.77778C6.37037 9.36868 6.03873 9.03704 5.62963 9.03704C5.22053 9.03704 4.88889 9.36868 4.88889 9.77778C4.88889 10.5135 5.34898 11.2114 5.84659 11.7089C6.3626 12.2249 7.06203 12.6727 7.80205 12.8621C7.86507 12.8795 7.93145 12.8889 8 12.8889C8.06856 12.8889 8.13494 12.8795 8.19795 12.8621C8.93797 12.6727 9.6374 12.2249 10.1534 11.7089C10.651 11.2114 11.1111 10.5135 11.1111 9.77778C11.1111 9.36868 10.7795 9.03704 10.3704 9.03704C9.96127 9.03704 9.62963 9.36868 9.62963 9.77778C9.62963 9.93094 9.49713 10.2701 9.10585 10.6614C8.99301 10.7742 8.86987 10.8797 8.74074 10.9749V5.02511C8.86987 5.1203 8.99301 5.22575 9.10585 5.3386C9.49713 5.72987 9.62963 6.06906 9.62963 6.22222C9.62963 6.63132 9.96127 6.96296 10.3704 6.96296C10.7795 6.96296 11.1111 6.63132 11.1111 6.22222C11.1111 5.4865 10.651 4.78865 10.1534 4.29103C9.6374 3.77503 8.93798 3.3273 8.19796 3.13786Z"
                        fill="#80FFB7"
                        fill-opacity="0.8"
                      />
                    </svg>
                    -
                  </div>
                </div>
                <div className="w-full h-[1px] bg-white/15" />
                <div className="w-full flex flex-col gap-[10px]">
                  <span className="px-[16px] h-[44px] py-2 flex items-center justify-between  text-white/80 border border-[#F6C324CC] rounded-[14px] text-[14px] leading-[14px] bg-[#F6C32429]">
                    <span className="flex items-center gap-[10px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.163146 1.21154C-0.0916624 0.88504 -0.0336248 0.413731 0.292777 0.158845C0.619179 -0.0960419 1.09034 -0.0379862 1.34515 0.288516C2.90655 2.28924 4.20261 3.86372 5.48531 5.268C5.70842 5.27333 5.93632 5.28948 6.17307 5.31628C6.67506 3.61014 7.39979 2.21534 8.54057 0.678327C8.77274 0.365508 9.21888 0.26229 9.55752 0.501752C10.0818 0.872499 10.4345 1.48531 10.7246 2.02019C11.2755 2.08434 11.9072 2.25545 12.4488 2.46681C12.7431 2.58161 13.0171 2.71074 13.2415 2.84528C13.4585 2.97542 13.6562 3.12646 13.7675 3.29447C13.8798 3.46413 13.9622 3.75581 13.987 4.07496C14.0125 4.40284 13.9803 4.79495 13.8304 5.17505C13.6792 5.5585 13.4092 5.92636 12.9684 6.19576C12.5604 6.44518 12.0197 6.60187 11.3176 6.62246C11.0028 7.34102 10.8391 8.385 10.7737 9.49061C10.7588 9.74402 10.749 9.99904 10.7436 10.2521C11.6327 10.9978 12.6099 11.7875 13.7152 12.6616C14.04 12.9185 14.0952 13.3901 13.8384 13.7151C13.5816 14.04 13.1101 14.0952 12.7853 13.8383C6.98189 9.249 4.60447 6.90248 0.163146 1.21154ZM0.0603762 4.49626C0.0862122 4.12203 0.372515 3.84247 0.703203 3.80181C3.96101 7.84665 6.27108 10.1293 10.4373 13.5036C10.3188 13.5766 10.1789 13.6191 10.0273 13.6191H8.61463C8.49993 13.6191 8.36144 13.5955 8.23805 13.51C7.90484 13.2793 7.70068 12.9681 7.54959 12.657C7.47431 12.502 7.41039 12.343 7.35111 12.1923L7.32615 12.1287C7.27535 11.9991 7.2275 11.8771 7.17519 11.7599C7.05354 11.4875 6.92243 11.2772 6.73189 11.1358C6.54718 10.9988 6.27671 10.9051 5.83325 10.9286C5.30422 10.9566 4.8883 11.1412 4.58276 11.4552C4.27451 11.772 4.0594 12.2404 3.97351 12.8673C3.91898 13.2653 3.59029 13.6191 3.15134 13.6191H1.87667C1.58373 13.6191 1.30676 13.4543 1.18051 13.1765C0.046205 10.6807 -0.115646 7.04585 0.0603762 4.49626Z"
                          fill="#F6C324"
                          fill-opacity="0.8"
                        />
                      </svg>
                      <span className="text-white/50"> Төрөл </span>
                    </span>
                    <span className="text-white/80 text-[14px] leading-[14px]">
                      {selectedSos?.alertId?.alarmStr}
                    </span>
                  </span>
                  <span className="px-[16px] h-[44px] py-2 flex items-center justify-between  text-white/80 border border-[#F6C324CC] rounded-[14px] text-[14px] leading-[14px] bg-[#F6C32429]">
                    <span className="flex items-center gap-[10px]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.0995 2.0995C3.49981 0.699178 5.52055 0 8 0C10.4795 0 12.5002 0.699178 13.9005 2.0995C15.3008 3.49981 16 5.52055 16 8C16 10.4795 15.3008 12.5002 13.9005 13.9005C12.5002 15.3008 10.4795 16 8 16C5.52055 16 3.49981 15.3008 2.0995 13.9005C0.699178 12.5002 0 10.4795 0 8C0 5.52055 0.699178 3.49981 2.0995 2.0995ZM8.03711 3.60157C8.51049 3.60157 8.89425 3.98531 8.89425 4.45871V7.60485L10.7101 9.45282C11.0419 9.79048 11.0371 10.3332 10.6995 10.6649C10.3618 10.9967 9.81912 10.992 9.48733 10.6543L7.42573 8.55625C7.26822 8.39596 7.17997 8.18022 7.17997 7.9555V4.45871C7.17997 3.98531 7.56373 3.60157 8.03711 3.60157Z"
                          fill="#F6C324"
                          fill-opacity="0.8"
                        />
                      </svg>

                      <span className="text-white/50"> SOS огноо </span>
                    </span>
                    <span className="text-white/80 text-[14px] leading-[14px]">
                      {new Date(parseInt(selectedSos.createdAt)).toLocaleString(
                        "mn-MN"
                      )}
                    </span>
                  </span>
                  <span className="px-[16px] h-[44px] py-2 flex items-center justify-between  text-white/80 border border-[#F6C324CC] rounded-[14px] text-[14px] leading-[14px] bg-[#F6C32429]">
                    <span className="flex items-center gap-[10px]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 0C9.97406 0 11.9931 0.573212 13.4322 1.77525C15.0536 3.12963 15.8727 5.30938 15.9862 7.47421C16.0998 9.63969 15.5146 11.9062 14.1809 13.4722C12.7203 15.1874 10.3242 15.9988 8 15.9988C5.67584 15.9988 3.27971 15.1874 1.81906 13.4722C0.485491 11.9062 -0.0997512 9.63969 0.0138158 7.47421C0.127349 5.30938 0.946395 3.12963 2.56785 1.77525C4.0069 0.573212 6.02593 0 8 0ZM7.99994 3.62932C8.47329 3.62932 8.85702 4.01305 8.85702 4.4864V8.18863C8.85702 8.66198 8.47329 9.04571 7.99994 9.04571C7.52659 9.04571 7.14286 8.66198 7.14286 8.18863V4.4864C7.14286 4.01305 7.52659 3.62932 7.99994 3.62932ZM7.99994 9.98486C8.47329 9.98486 8.85702 10.3686 8.85702 10.8419V11.5123C8.85702 11.9856 8.47329 12.3693 7.99994 12.3693C7.52659 12.3693 7.14286 11.9856 7.14286 11.5123V10.8419C7.14286 10.3686 7.52659 9.98486 7.99994 9.98486Z"
                          fill="#F6C324"
                          fill-opacity="0.8"
                        />
                      </svg>

                      <span className="text-white/50"> SOS түвшин </span>
                    </span>
                    <span className="text-white/80 text-[14px] leading-[14px]">
                      {selectedSos.sosLvl}
                    </span>
                  </span>
                  <span className="px-[16px] h-[44px] py-2 flex items-center justify-between  text-white/80 border border-[#F6C324CC] rounded-[14px] text-[14px] leading-[14px] bg-[#F6C32429]">
                    <span className="flex items-center gap-[10px]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.0988 2.0988C3.49767 0.699922 5.51768 0 8 0C10.4823 0 12.5023 0.699922 13.9013 2.0988C15.3001 3.49767 16 5.51768 16 8C16 10.4823 15.3001 12.5023 13.9013 13.9013C12.5023 15.3001 10.4823 16 8 16C5.51768 16 3.49767 15.3001 2.0988 13.9013C0.699922 12.5023 0 10.4823 0 8C0 5.51768 0.699922 3.49767 2.0988 2.0988ZM8.17351 5.35162C7.64279 5.24606 7.11607 5.67832 7.11607 6.21943C7.11607 6.69281 6.73232 7.07657 6.25893 7.07657C5.78554 7.07657 5.40178 6.69281 5.40178 6.21943C5.40178 4.59725 6.91695 3.35381 8.50794 3.67027C9.52379 3.87234 10.348 4.69655 10.5501 5.7124C10.6517 6.2231 10.5929 6.71385 10.3684 7.1555C10.1515 7.58217 9.81086 7.90302 9.44488 8.14755C9.29178 8.24985 9.17035 8.33298 9.07026 8.40784C8.96969 8.48306 8.90857 8.53683 8.87115 8.57577C8.86544 8.58171 8.86063 8.58695 8.85663 8.59149C8.83105 9.0419 8.4577 9.39925 8.00088 9.39925C7.5275 9.39925 7.14374 9.0155 7.14374 8.5421C7.14374 8.04679 7.36309 7.67097 7.63514 7.38789C7.87539 7.1379 8.19801 6.91893 8.49247 6.72217C8.69943 6.58389 8.79633 6.46503 8.84019 6.37873C8.87645 6.30742 8.90157 6.21197 8.86872 6.04683C8.80193 5.71104 8.50931 5.41842 8.17351 5.35162ZM8.00011 10.3669C8.47351 10.3669 8.85726 10.7507 8.85726 11.2241V11.5222C8.85726 11.9955 8.47351 12.3793 8.00011 12.3793C7.52673 12.3793 7.14297 11.9955 7.14297 11.5222V11.2241C7.14297 10.7507 7.52673 10.3669 8.00011 10.3669Z"
                          fill="#F6C324"
                          fill-opacity="0.8"
                        />
                      </svg>

                      <span className="text-white/50"> Хохирол </span>
                    </span>
                    <span className="text-white/80 text-[14px] leading-[14px]">
                      {selectedSos.damageLvl}
                    </span>
                  </span>
                  <span className="px-[16px] h-[44px] py-2 flex items-center justify-between  text-white/80 border border-[#F6C324CC] rounded-[14px] text-[14px] leading-[14px] bg-[#F6C32429]">
                    <span className="flex items-center gap-[10px]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.0995 2.0995C3.4998 0.699178 5.52056 0 8 0C10.4794 0 12.5001 0.699178 13.9006 2.0995C15.3009 3.4998 16 5.52056 16 8C16 10.4794 15.3009 12.5001 13.9006 13.9006C12.5001 15.3009 10.4794 16 8 16C5.52056 16 3.4998 15.3009 2.0995 13.9006C0.699178 12.5001 0 10.4794 0 8C0 5.52056 0.699178 3.4998 2.0995 2.0995ZM3.67823 11.1282C3.24196 10.7948 3.19439 10.164 3.53805 9.73575C3.90234 9.28181 4.3083 8.84777 4.70597 8.42261C4.75895 8.36597 4.81177 8.3095 4.86433 8.25314C5.08978 8.01145 5.46822 7.99671 5.71816 8.21297C5.77602 8.26303 5.8282 8.30738 5.87966 8.35113C6.03758 8.48539 6.18878 8.61394 6.47674 8.8839C7.55616 8.24249 8.23065 7.57614 8.88397 6.47667C8.61442 6.18914 8.48631 6.03841 8.35246 5.88095C8.3093 5.83017 8.26555 5.7787 8.21627 5.72172C7.99982 5.47142 8.01478 5.09235 8.25528 4.86505C8.32357 4.80052 8.39212 4.73538 8.46099 4.66995C8.88053 4.27132 9.31199 3.86139 9.76756 3.50647C10.1858 3.18062 10.7908 3.24046 11.1151 3.65991C11.1773 3.74027 11.2326 3.81793 11.2953 3.90593C11.4012 4.05463 11.5282 4.23287 11.7446 4.50354C12.5129 5.46474 12.5129 6.85651 11.7403 7.81429C11.17 8.52134 10.5719 9.2348 9.90338 9.90333C9.23486 10.5719 8.52141 11.1699 7.81435 11.7403C6.85658 12.5129 5.46479 12.5129 4.50361 11.7445C4.23346 11.5286 4.05427 11.4005 3.90469 11.2936C3.82377 11.2358 3.75153 11.1842 3.67823 11.1282Z"
                          fill="#F6C324"
                          fill-opacity="0.8"
                        />
                      </svg>

                      <span className="text-white/50"> Төлөв </span>
                    </span>
                    <span className="text-white/80 text-[14px] leading-[14px]">
                      {selectedSos.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : showMaps ? (
          <SosAlert />
        ) : (
          <div className="w-full h-full overflow-y-auto">
            <IlgeesenZorchil />
          </div>
        )}
      </div>
    </div>
  );
}
