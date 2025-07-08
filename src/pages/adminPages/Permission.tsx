import { useState } from "react";
import BaruunSum from "../../assets/componentsSvg/adminsvg/baruunSumIcon";
import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";
import CorrectIcon from "../../assets/componentsSvg/adminsvg/correctIcon";
import SearchIcon from "../../assets/componentsSvg/adminsvg/searchIcon";
import TailanSumIcon from "../../assets/componentsSvg/adminsvg/tailanSumIcon";
import MessengerShigIcon from "../../assets/componentsSvg/adminsvg/messengerShigIcon";
import SosAlert from "../../components/SosAlert";
import Location from "../../assets/componentsSvg/adminsvg/location";
import ClockIcon from "../../assets/componentsSvg/adminsvg/clockIcon";
import { useQuery } from "@apollo/client";
import { GET_USER, GET_VIOLATION } from "../../graphql/queries";
import Xicon from "../../assets/componentsSvg/adminsvg/xIcon";
// import { useQuery } from "@apollo/client";
// import { GET_VIOLATION } from "../graphql/queries";

export default function Permission() {
  const [showSearch, setShowSearch] = useState(false);
  const [filterType, setFilterType] = useState("violation");
  const [selectedPermission, setSelectedPermission] = useState<any | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, loading, error } = useQuery(GET_VIOLATION, {
    fetchPolicy: "cache-and-network",
  });
  const datas = data?.getViolations?.filter(
    (item: any) => item.type === filterType
  );

  // const {data:sohData , loading:sohLoading , error:sohError} = useQuery(GET_USER,{
  //   variables:data?.getViolations.propertyId._id
  // })

  const paginatedFeedbacks = datas?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = datas ? Math.ceil(datas.length / itemsPerPage) : 0;
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  function formatDateTimeDot(date: Date): string {
    const datePart = date.toLocaleDateString("en-CA").replace(/-/g, ".");
    const timePart = date.toLocaleTimeString("mn-MN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${datePart} ${timePart}`;
  }

  return (
    <div className="grid grid-cols-10 gap-[20px] px-4">
      {/* Left section */}
      <div className="col-span-10 2xl:col-span-8 flex flex-col gap-[20px]">
        <div className="w-full h-[942px] overflow-hidden rounded-[18px] bg-black/10 flex flex-col gap-[20px] pb-[20px] relative">
          {/* Header */}
          <div className="w-full h-[56px] custom-background flex justify-between items-center px-[20px] py-[16px]">
            <div className="flex items-center gap-[6px]">
              <MessengerShigIcon />
              <div className="text-white text-[12px]">Нийт зөвшөөрөл</div>
              <div className="px-[10px] py-[8px] h-[28px] flex justify-center items-center border border-white/10 rounded-[18px] text-[12px] text-white/60">
                {datas && datas.length}
              </div>
            </div>

            <div className="flex items-center gap-[10px]">
              {["violation", "permission"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-[16px] text-[12px] h-[32px] text-center rounded-[12px] ${
                    filterType !== type
                      ? "bg-white/10 text-white"
                      : "border border-[#80FFB766] bg-[#80FFB714] text-white/80"
                  }`}
                >
                  {type === "violation" ? "Зөрчил" : null}
                  {type === "permission" ? "Зөвшөөрөл" : null}
                </button>
              ))}
              <div className="w-[1px] h-full bg-white/15"></div>
              <div className="flex items-center gap-[8px]">
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden border border-white/10 rounded-[8px] bg-black/20 ${
                    showSearch
                      ? "w-[200px] opacity-100 px-2 py-1"
                      : "w-[1px]  p-0"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Хайх..."
                    className="bg-transparent outline-none text-white text-sm w-full"
                  />
                </div>
                <button onClick={() => setShowSearch(!showSearch)}>
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Table header */}
          <header className="w-[calc(100%-40px)] mx-auto flex justify-between pl-[56px] pr-[100px] h-[44px] bg-black/10 items-center text-white/60 text-[10px] rounded-[14px]">
            <div className="flex items-center">
              <span className="flex gap-[4px] items-center">
                ЗӨРЧИЛИЙН НЭР <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[95px] items-center">
                Обект -ын нэр <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[68px] items-center">
                ТАЙЛБАР <DooshooZaasanSum />
              </span>
            </div>
            <div className="flex items-center">
              <span className="flex gap-[4px]">
                ИЛГЭЭСЭН ОГНОО <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[55px]">
                ЗӨРЧЛИЙН ТӨЛӨВ <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[66px]">
                ЗӨРЧИЛ ИЛГЭЭСЭН <DooshooZaasanSum />
              </span>
            </div>
          </header>

          {/* Feedbacks list */}
          <div className="min-w-full px-[20px] flex flex-col gap-[10px]">
            {paginatedFeedbacks?.map((item: any, i: number) => (
              <div
                key={item.id}
                onClick={() => setSelectedPermission(item)}
                className="cursor-pointer h-[58px] w-full overflow-x-auto flex items-center gap-4 px-[16px] relative bg-[#F6C32414] border border-[#F6C32466] rounded-[14px] text-white/80"
              >
                <div className="flex items-center gap-[42px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="min-w-[24px] h-[24px] bg-white/10 rounded-full flex items-center justify-center text-[10px] leading-[10px]">
                      {i + 1}
                    </div>
                    <img
                      className="w-8 h-8 rounded-[8px] ml-[6px]"
                      src={item.image ?? "/image/hothonizurag.png"}
                      alt=""
                    />
                    <span className="text-[14px] leading-[14px] whitespace-nowrap w-[110px] overflow-hidden text-ellipsis">
                      {filterType === "violation" ? "Зөрчил" : null}
                      {filterType === "permission" ? "Зөвшөөрөл" : null}
                    </span>
                  </div>
                  <span className="w-[106px] bg-white/10 rounded-[8px] text-[12px] leading-[12px] px-[14px] py-[8px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.propertyId.name}
                  </span>
                  <span className="text-[14px] overflow-hidden text-ellipsis leading-[14px] whitespace-nowrap w-[374px] ">
                    {item.description}
                  </span>
                  <span className="text-[14px] leading-[14px] whitespace-nowrap w-[140px] overflow-hidden text-ellipsis text-center">
                    {item?.createdAt
                      ? formatDateTimeDot(new Date(parseInt(item.createdAt)))
                      : "-"}
                  </span>
                  <div className="w-[130px] flex justify-start">
                    <div
                      className={`rounded-[8px] flex items-center px-[15px] py-2 ${
                        item.status === "resolved"
                          ? "border border-[#80FFB766] bg-[#80FFB714]"
                          : "border bg-[#F6C32429] border-[#F6C32466]"
                      }`}
                    >
                      <div className="text-white/80 text-[12px] flex items-center gap-[5px]">
                        {item.status !== "unresolved" ? (
                          <CorrectIcon />
                        ) : (
                          <Xicon />
                        )}
                        <p>
                          {item.status && item.status === "unresolved"
                            ? "Шийдэгдээгүй"
                            : ""}
                          {item.status && item.status === "resolved"
                            ? "Шийдсэн"
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-2 ml-[21px]">
                  <div className="w-[30px] h-[30px] rounded-full border border-[#80FFB7] relative">
                    <img
                      className="w-full h-full rounded-full"
                      src={item.userId.ProfilePic && "/image/profile.png"}
                    />
                    <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#80FFB7] rounded-full"></div>
                  </div>
                  <p className="text-[12px] w-[100px] overflow-hidden whitespace-nowrap text-ellipsis ">
                    {item.userId.firstname} {item.userId.lastname}
                  </p>
                </span>
                <div className="absolute right-[18px]">
                  <BaruunSum />
                </div>
              </div>
            ))}
          </div>
          {datas && datas.length > itemsPerPage && (
            <div className="flex gap-[4px] px-5 absolute bottom-5 mt-4">
              <div
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                className="min-w-[36px] h-[36px] bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]"
              >
                <TailanSumIcon />
              </div>
              {pages.map((page) => (
                <div
                  key={page}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`min-w-[36px] h-[36px] ${
                    currentPage === page + 1
                      ? "bg-white/15"
                      : "border border-white/15"
                  } flex justify-center items-center text-[14px] text-white/90 rounded-[10px] cursor-pointer`}
                >
                  {page + 1}
                </div>
              ))}
              <div
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className="min-w-[36px] h-[36px] bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px] rotate-180"
              >
                <TailanSumIcon />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="col-span-10 2xl:col-span-2 max-h-[942px]">
        {!selectedPermission ? (
          <SosAlert />
        ) : (
          <div className="h-full w-full rounded-[18px] overflow-hidden bg-black/15 ">
            <div className="px-[18px] h-[56px] gap-2 flex items-center  bg-black/15">
              <MessengerShigIcon />
              <div className="text-white/90 text-[14px]">
                Зөвшөөрлийн тайлбар
              </div>
            </div>
            <div className="p-[20px] h-[calc(100%-56px)] flex flex-col gap-4 ">
              <div className="flex flex-col gap-[10px]">
                <img
                  src={selectedPermission.image}
                  className="h-[154px] w-full rounded-[16px] bg-cover bg-center"
                  alt=""
                />
                <div className="flex items-center gap-[10px] text-[14px] leading-[14px] h-[44px] rounded-[14px] text-white/80 bg-white/10 pl-[16px]  ">
                  <Location /> Дулаан гараж
                </div>
              </div>
              <div className="h-[1px] w-full bg-white/15" />
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-between gap-[10px] text-[14px] leading-[14px] h-[44px] rounded-[14px] text-white/80 bg-white/10 px-[16px]  ">
                  <div className="flex items-center gap-[10px]">
                    <ClockIcon /> Илгээсэн огноо
                  </div>
                  {selectedPermission?.createdAt
                    ? formatDateTimeDot(
                        new Date(parseInt(selectedPermission.createdAt))
                      )
                    : "-"}
                </div>
                <div className="flex items-center justify-between gap-[10px] text-[14px] leading-[14px] h-[44px] rounded-[14px] text-white/80 bg-white/10 px-[16px]  ">
                  <div className="flex items-center gap-[10px]">
                    <CorrectIcon width="16px" height="16px" color="white" />
                    Төлөв
                  </div>
                  {selectedPermission.status &&
                  selectedPermission.status === "unresolved"
                    ? "Шийдэгдээгүй"
                    : "Шийдсэн"}
                </div>
              </div>
              <div className="h-[1px] w-full bg-white/15" />
              <div className="flex flex-col gap-[10px]">
                <div className="w-full border border-white/15 p-[16px] flex flex-col gap-[10px] rounded-[14px]">
                  <label className="text-white/40 text-[12px]">
                    Зөвшөөрөл илгээсэн
                  </label>
                  <div className="h-[50px] text-[14px] text-white/80 flex gap-[10px] items-center bg-white/10 rounded-[14px] px-[10px]">
                    <div className="border w-[30px] h-[30px] rounded-full relative border-[#80FFB766]">
                      <img
                        className="h-full w-full rounded-full"
                        src={"/image/profile.png"}
                        alt=""
                      />
                      <div className="w-[10px] h-[10px] rounded-full bg-[#80FFB7] absolute right-0 bottom-0" />
                    </div>
                    {selectedPermission.userId.firstname}{" "}
                    {selectedPermission.userId.lastname}
                  </div>
                </div>
              </div>
              <div className="w-full rounded-[14px] border border-white/10 px-4 py-[18px]">
                <p className="text-[14px] text-white/80">
                  {selectedPermission.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
