"use client";
import React, { useState } from "react";
import OgogdsonUureg from "../../components/OgogdsonUureg";
import UuregList from "../../components/UuregList";
import GuardDetails from "../../components/GuardDetails";
import AddGuard from "../../components/AddGuard";

import { EmployeeData } from "../../type/type";
import { GET_REQUESTS, LIST_USERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import HamgaalagchIcon from "../../assets/componentsSvg/adminsvg/hamgaalagchIcon";
import SearchIcon from "../../assets/componentsSvg/adminsvg/searchIcon";
import PlusIcon from "../../assets/componentsSvg/adminsvg/plusIcon";
import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";
import CorrectIcon from "../../assets/componentsSvg/adminsvg/correctIcon";
import ClockIcon from "../../assets/componentsSvg/adminsvg/clockIcon";
import { REQUEST } from "../../graphql/mutations";
import Lottie from "lottie-react";
import loadingSideBar from "../../lottie/loading-side-bar.json";
import MainLoading from "../../components/loading/MainLoading";
const tableHeaders = [
  "ОВОГ НЭР",
  "ID ДУГААР",
  "УТАСНЫ ДУГААР",
  "ХАРИУЦСАН ОБЪЕКТ",
  "АЖИЛТАНЫ ТӨЛӨВ",
  "ИРСЭН ОГНОО",
  "ЯВСАН ОГНОО",
  "САХИЛГЫН СТАТУС",
];

function AllGuardsTable() {
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [addEmployee, setAddEmployee] = useState(false);

  // GRAPHQL query
  const { loading, error, data } = useQuery(LIST_USERS, {
    variables: { role: "guard" },
    fetchPolicy: "cache-and-network",
  });
  const {
    loading: UuregLoading,
    data: UuregData,
    error: UuregError,
    refetch,
  } = useQuery(GET_REQUESTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <MainLoading />;
  // if (error) return <p>Error! {error.message}</p>;

  // const guards: EmployeeData[] =
  //   data?.listUsers.map((user: any) => ({
  //     id: user._id,
  //     key: user._id,
  //     name: `${user.lastname || ""} ${user.firstname || ""}`,
  //     phoneNumber: user.phone,
  //     gender: user.gender,
  //     img_url: user.profilePic,
  //     assignedObject: [],
  //     employeeStatus: "Идэвхтэй",
  //     dateReceived: "2025.03.08 08:34",
  //     dateSent: "2025.03.08 18:33",
  //     disciplinaryStatus: "Хэвийн ажилтан",
  //     status: "Хэвийн ажилтан",
  //   })) || [];
  const guards = data?.listUsers;
  // const {data:timeEntiesData} = useQuery()
  return (
    <div className="grid grid-cols-10 gap-[20px] px-4">
      <div className="col-span-10 2xl:col-span-8 max-h-[942px] pb-4 overflow-hidden rounded-[18px] bg-black/10">
        <div className="w-full h-[56px] custom-background flex justify-between items-center px-[20px] py-[16px]">
          <div className="flex items-center gap-[6px]">
            <HamgaalagchIcon />
            <div className="text-white text-[12px]">Нийт хамгаалагч</div>
            <div className="px-[10px] py-[8px] h-[28px] flex justify-center items-center rounded-[18px] bg-[rgba(255,255,255,0.08)] text-[12px] text-white">
              {guards.length}
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <button>
              <SearchIcon />
            </button>
            <button
              onClick={() => {
                setAddEmployee(true);
                setSelectedEmployee(null);
              }}
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="pt-[20px] px-[20px] flex flex-col gap-[10px]">
          <div className="w-full h-[44px]  grid grid-cols-8 gap-[5px] custom-background rounded-[14px]">
            {tableHeaders.map((word, i) => (
              <div
                key={i}
                className="flex justify-center items-center whitespace-nowrap gap-[4px] text-[12px] text-white font-[400] leading-[14px]"
              >
                <div className="custom-text-style ml-[20px]">{word}</div>
                <DooshooZaasanSum />
              </div>
            ))}
          </div>

          <div className="w-full h-full flex flex-col gap-[10px] ">
            {guards.map((data: any, i: number) => (
              <div
                onClick={() => {
                  setSelectedEmployee(data);
                }}
                key={i}
                className="w-full h-[58px] relative custom-background rounded-[14px] px-[16px] grid grid-cols-2 gap-[150px] hover:scale-[102%] duration-150 cursor-pointer hover:ring-[1px] hover:ring-[#80ffb7]"
              >
                <h1 className="absolute h-[24px] text-[10px] text-white/80 leading-[8px] rounded-full px-[8px] flex justify-center items-center bg-white/10  top-1/2 -translate-y-1/2 left-[10px]">
                  {i + 1}
                </h1>
                <div className="grid grid-cols-4">
                  <div className="flex ml-[30px] items-center whitespace-nowrap text-[12px] text-white font-[400] leading-[14px] gap-[6px]">
                    <img
                      className="w-[40px] h-[40px] rounded-full bg-gray-400"
                      src={data.profilePic ?? "/image/profile.png"}
                      alt=""
                    />
                    <div>
                      {data.firstname} {data.lasttname}
                    </div>
                  </div>
                  <div className="flex justify-center items-center text-white text-[12px] ml-[50px]">
                    {data._id ? `${data._id.slice(0, 5)}...` : "N/A"}
                  </div>

                  <div className="flex justify-center items-center text-white text-[12px] ml-[50px]">
                    {data.phone || "N/A"}
                  </div>
                  <div className="flex ml-[90px] flex-wrap gap-[4px] items-center text-white text-[12px]">
                    {/* {(data.assignedObject || []).map(
                      (obj: string, i: number) => (
                        <div
                          key={i}
                          className="px-[10px] py-[6px] rounded-[8px] custom-background"
                        >
                          {obj}
                        </div>
                      )
                    )} */}
                    ---------
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center">
                  <div
                    className={`flex h-[30px] px-[13px] items-center whitespace-nowrap text-[12px] text-white font-[400] border-[1px] rounded-[8px] gap-[5px] justify-center border-white/10`}
                  >
                    {data.status === "active" ? (
                      <ClockIcon width="12" height="12" color="#ffffff80" />
                    ) : (
                      <CorrectIcon width="12" height="12" />
                    )}
                    {data.status !== "active" ? "Хэвийн" : "Амралттай"}
                    {/* {data.status === "active" ? "Хэвийн" : null} */}
                  </div>
                  <div className="flex justify-center text-white text-[12px]">
                    {data.dateReceived || "-"}
                  </div>
                  <div className="flex justify-center text-white text-[12px]">
                    {data.dateSent || "-"}
                  </div>
                  <div
                    className={`flex justify-center items-center text-[12px] text-white px-[14px] py-[8px] rounded-[8px]
                    ${
                      data.disciplinaryStatus === "Журамын зөрчилтэй"
                        ? "bg-[#E5393529] backdrop-blur-15"
                        : "bg-[#80FFB729] backdrop-blur-15"
                    }`}
                  >
                    {data.disciplinaryStatus || "Хэвийн ажилтан"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Хуудаслалт */}
          {/* <div className="flex gap-[4px]">
            {[1, 2, 3, "...", 10].map((page, index) => (
              <div
                key={index}
                className="w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]"
              >
                {page}
              </div>
            ))}
          </div> */}
        </div>
      </div>

      <div className="col-span-10 2xl:col-span-2">
        {selectedEmployee ? (
          <GuardDetails employee={selectedEmployee} />
        ) : addEmployee ? (
          <AddGuard refetch={refetch} />
        ) : (
          <div className="h-[942px]">
            <OgogdsonUureg />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllGuardsTable;
