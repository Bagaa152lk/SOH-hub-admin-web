// Hook
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
// Icons
import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";
import BaruunSum from "../../assets/componentsSvg/adminsvg/baruunSumIcon";
import SearchIcon from "../../assets/componentsSvg/adminsvg/searchIcon";
import CorrectIcon from "../../assets/componentsSvg/adminsvg/correctIcon";
import Xicon from "../../assets/componentsSvg/adminsvg/xIcon";
import PlusIcon from "../../assets/componentsSvg/adminsvg/plusIcon";
import ToolIcon from "../../assets/componentsSvg/toolIcon";
// Components
import OgogdsonUureg from "../../components/OgogdsonUureg";
// Query
import {
  GET_REQUESTS,
  GET_TIME_ENTRIES_SEARCH_JSON,
} from "../../graphql/queries";
import TableEmployeeUureg from "../../components/TableEmployeeUureg";
import ClockIcon from "../../assets/componentsSvg/adminsvg/clockIcon";
import ProfileShigIcon from "../../assets/componentsSvg/adminsvg/profileShigIcon";
import { REQUEST } from "../../graphql/mutations";

export default function PropertyOwnerGuardTask() {
  const [createRequest] = useMutation(REQUEST);
  const { data, loading, error } = useQuery(GET_REQUESTS, {
    fetchPolicy: "cache-and-network",
  });
  const datas = data?.getRequests?.filter(
    (item: any) => item.propertyId._id === localStorage.getItem("userId")
  );
  const {
    loading: timeEntriesLoading,
    error: timeEntriesError,
    data: timeEntriesData,
  } = useQuery(GET_TIME_ENTRIES_SEARCH_JSON, {
    fetchPolicy: "cache-and-network",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchGuard, setSearchGuard] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGuards, setSelectedGuards] = useState<any[]>([]);

  const [selectedReport, setSelectedReport] = useState<
    (typeof datas)[0] | null
  >(null);
  const [showAddGuardsTask, setShowAddGuardsTask] = useState<boolean>(false);

  const toggleSelectGuard = (guard: any) => {
    const exists = selectedGuards?.find((g) => g._id === guard._id);
    if (exists) {
      setSelectedGuards((prev) => prev?.filter((g) => g._id !== guard._id));
    } else {
      setSelectedGuards((prev) => [...prev, guard]);
    }
  };

  const workingGuards = timeEntriesData?.getTimeEntries?.filter(
    (time: any) =>
      time.status === "checkedIn" &&
      time.propertyId._id === localStorage.getItem("userId")
  );
  function onClickaddTaskGuard() {

    const acceptedGuards = selectedGuards.filter((guard) =>
      timeEntriesData?.getTimeEntries?.some(
        (time: any) =>
          time.userId._id === guard.userId._id && time.status === "checkedIn"
      )
    );

    if (acceptedGuards.length === 0) {
      alert("Сонгосон ажилтнуудаас зөвшөөрөгдсөн бүртгэлтэй хүн олдсонгүй.");
      return;
    }

    acceptedGuards.forEach((guard) => {
      const entry = timeEntriesData?.getTimeEntries.find(
        (time: any) =>
          time.userId._id === guard.userId._id && time.status === "checkedIn"
      );

      const reqData = {
        userId: localStorage.getItem("adminId"),
        propertyId: localStorage.getItem("userId"),
        toUserId: guard?.userId?._id,
        type: "guard",
        status: "unresolved",
        title,
        desc: description,
      };

      createRequest({ variables: reqData })
        .then(() => {
          alert(`${guard?.userId?.firstname} -д амжилттай үүрэг өглөө.`);
          setSelectedGuards([]);
          setTitle("");
          setDescription("");
          setShowAddGuardsTask(false);
        })
        .catch((err) => {
          console.error(err);
          alert(
            `${guard?.userId?.fistname} -д Алдаа гарлаа. Дахин оролдоно уу.`
          );
        });
    });
  }

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-10 gap-[20px] px-4">
      {/* LEFT - FEEDBACK LIST */}
      <div className="col-span-10 2xl:col-span-8 max-h-[942px] pb-4 overflow-hidden rounded-[18px] bg-black/10">
        <div className="w-full h-[56px] custom-background flex justify-between items-center px-[20px] py-[16px]">
          <div className="flex items-center gap-[6px]">
            <ToolIcon />
            <div className="text-white text-[12px]">Нийт үүрэг</div>
            <div className="px-[10px] py-[8px] h-[28px] flex justify-center items-center rounded-[18px] bg-[rgba(255,255,255,0.08)] text-[12px] text-white">
              {(datas?.getRequests && datas?.getRequests.length) || 0}
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="flex gap-[16px] items-center text-[14px] text-white/40">
              <div className="flex items-center gap-[8px]">
                <CorrectIcon width="16px" height="16px" color="#FFFFFF66" />
                Биелэгдсэн
                <div className="px-[10px] py-[8px] h-[28px] flex justify-center items-center rounded-[18px] border border-white/10 text-[12px] text-white/40">
                  {
                    data?.getRequests?.filter(
                      (request: any) => request.status === "resolved"
                    ).length
                  }
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <Xicon width="16px" height="16px" color="#FFFFFF66" />
                Биелэгдээгүй
                <div className="px-[10px] py-[8px] h-[28px] flex justify-center items-center rounded-[18px] border border-white/10 text-[12px] text-white/40">
                  {
                    data?.getRequests?.filter(
                      (request: any) => request.status === "unresolved"
                    ).length
                  }
                </div>
              </div>
            </div>
            {/* SEARCH */}
            <div className="flex items-center gap-[8px] ml-[20px]">
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
            <button
              onClick={() => {
                setShowAddGuardsTask(true);
              }}
            >
              {" "}
              <PlusIcon />
            </button>
          </div>
        </div>

        {/* HEADER */}
        <div className="p-5">
          <header className="w-full flex justify-between pl-[50px] pr-[98px] h-[44px] bg-black/10 items-center text-white/60 text-[10px] rounded-[14px]">
            <div className="flex">
              <span className="flex gap-[4px]">
                Хариуцсан ажилтан <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[71px]">
                УТАСНЫ ДУГААР <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[32px]">
                ҮҮРГИЙН ТӨРӨЛ <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[52px]">
                ТАЙЛБАР <DooshooZaasanSum />
              </span>
            </div>
            <div className="flex">
              <span className="flex gap-[4px]">
                ҮҮРЭГ ӨГСӨН ОГНОО <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[43px]">
                ҮҮРГИЙН ТӨЛӨВ <DooshooZaasanSum />
              </span>
            </div>
          </header>

          {/* FEEDBACK LIST */}
          <main className="py-[10px] flex flex-col gap-[10px] h-[800px] overflow-y-scroll">
            {datas &&
              datas.map((feedback: any, index: number) => (
                <div
                  key={feedback._id}
                  onClick={() => setSelectedReport(feedback)}
                  className={`w-full relative min-h-[58px] rounded-[14px] border pl-[16px] pr-[18px] flex items-center text-[14px] text-white/80 cursor-pointer ${
                    feedback.status === "unresolved"
                      ? "bg-[#F6C32414] border-[#F6C32466]"
                      : "bg-[#80FFB714] border-[#80FFB766]"
                  }`}
                >
                  <div className="flex gap-[10px] items-center">
                    <div className="w-6 h-6 rounded-full text-[10px] text-white/80 bg-white/10 flex justify-center items-center">
                      {index + 1}
                    </div>

                    <div className="flex items-center gap-[8px]">
                      <img
                        src={
                          feedback?.toUserId?.profilePic
                            ? feedback?.toUserId?.profilePic
                            : "/image/profile.png"
                        }
                        className="w-[30px] h-[30px] ml-[20px] rounded-full"
                        alt=""
                      />
                      <span className="w-[100px] overflow-hidden text-ellipsis">
                        {feedback?.toUserId && (
                          <>
                            {feedback.toUserId.firstname}
                            {feedback.toUserId.lastname}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <span className=" w-[98px] px-[16px] ml-[20px] text-[12px] h-[32px] flex items-center text-white/80 overflow-hidden whitespace-nowrap text-ellipsis">
                    {feedback?.toUserId && <>{feedback.toUserId.phone}</>}
                  </span>
                  <div className="w-[182px]">
                    <span className="ml-[30px] max-w-[152px]  overflow-hidden whitespace-nowrap text-ellipsis border border-white/15 bg-white/10 rounded-[8px] px-[14px] py-[8px] ">
                      {feedback.title}
                    </span>
                  </div>
                  <span className=" w-[500px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {feedback.desc}
                  </span>
                  <span className="w-[116px] ml-[10px]">
                    {
                      new Date(parseInt(feedback.createdAt))
                        .toISOString()
                        .split("T")[0]
                    }
                  </span>
                  <span
                    className={`text-ellipsis overflow-hidden whitespace-nowrap ml-[50px] px-[14px] py-[8px] ${
                      feedback.status === "unresolved"
                        ? "border-[1px] border-[#F6C32466] rounded-[8px] bg-[#F6C32429]"
                        : " rounded-[8px] bg-[#80FFB729]"
                    }`}
                  >
                    {feedback.status === "unresolved" ? "Биелэгдээгүй" : null}
                    {feedback.status === "resolved" ? "Биелэгдсэн" : null}
                  </span>
                  <div className="absolute right-[16px]">
                    <BaruunSum />
                  </div>
                </div>
              ))}
          </main>
        </div>
      </div>

      {/* RIGHT - FEEDBACK DETAIL OR DEFAULT */}
      <div className="col-span-10 2xl:col-span-2 flex flex-col gap-[20px]">
        {selectedReport ? (
          <div className="bg-black/15 rounded-[18px] overflow-hidden">
            <div className="bg-black/15 flex justify-between items-center px-5 h-[56px] text-white/80 text-[14px]">
              <div className="flex gap-[8px] items-center">
                <ToolIcon />
                Үүргийн тайлбар
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-xs text-white underline"
              >
                Буцах
              </button>
            </div>
            <div className="p-5 flex flex-col gap-[10px] h-[886px]">
              <div className="w-full rounded-[14px] bg-white/10 px-[16px] py-4 ">
                <p className="text-[14px] text-white/80 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <ClockIcon width="16px" height="16px" />
                    Төрөл
                  </div>
                  <div>
                    <div>{selectedReport.title}</div>
                  </div>
                </p>
              </div>
              <div className="w-full rounded-[14px] bg-white/10 px-[16px] py-4 ">
                <p className="text-[14px] text-white/80 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
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
                        d="M8.8566 15.9935C9.91255 15.9581 10.9456 15.8629 11.9456 15.7558C13.9322 15.5432 15.5242 13.9493 15.7452 11.9658C15.8614 10.924 15.9657 9.84509 16 8.74146L8.8566 8.74147V15.9935ZM16 7.25847C15.9657 6.15484 15.8614 5.07598 15.7452 4.03418C15.5242 2.05059 13.9322 0.456772 11.9456 0.244166C10.9456 0.137147 9.91255 0.0418702 8.8566 0.00645992V7.25848L16 7.25847ZM7.37404 16V0C6.2419 0.0287772 5.13512 0.129763 4.06612 0.244167C2.0795 0.456772 0.487526 2.05059 0.26649 4.03418C0.124524 5.30818 0 6.63762 0 7.99998C0 9.36234 0.124524 10.6918 0.26649 11.9658C0.487526 13.9493 2.0795 15.5432 4.06612 15.7558C5.13512 15.8702 6.2419 15.9712 7.37404 16Z"
                        fill="#80FFB7"
                        fill-opacity="0.8"
                      />
                    </svg>
                    Илгээсэн огноо
                  </div>
                  <div>
                    <div>
                      {
                        new Date(parseInt(selectedReport.createdAt))
                          .toISOString()
                          .split("T")[0]
                      }
                    </div>
                  </div>
                </p>
              </div>
              <div className="w-full rounded-[14px] bg-white/10 px-[16px] py-4 ">
                <p className="text-[14px] text-white/80 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <CorrectIcon width="16px" height="16px" />
                    Төлөв
                  </div>
                  <div>
                    <div>{selectedReport.status}</div>
                  </div>
                </p>
              </div>
              <div className="w-full col-span-2 pb-[16px] pt-[12px] px-[16px] h-[96px] flex flex-col gap-[5px] border border-white/5 rounded-[14px] ">
                <div className="text-white/50 text-[12px] leading=[8px]">
                  Хариуцсан ажилтан
                </div>
                <TableEmployeeUureg
                  img_url={"/image/profile.png"}
                  name={`${selectedReport.toUserId.firstname} ${selectedReport.toUserId.lastname}`}
                />
              </div>
              <div className="border border-white/15 rounded-[14px] px-4 py-3 text-[14px]  text-white/60">
                {selectedReport.desc}
              </div>
            </div>
          </div>
        ) : showAddGuardsTask ? (
          <div className="w-full h-[884px] relative bg-black/15 rounded-[18px] overflow-hidden flex flex-col">
            <div className="px-[18px] h-[56px] flex items-center justify-between bg-black/15">
              <div className="flex items-center gap-[16px]">
                <ProfileShigIcon />

                <div className="text-white/90">Ажилтанд үүрэг өгөх</div>
              </div>

              <div className="flex items-center gap-[10px]">
                <button
                  className="scale-110 text-[12px] underline text-white/80"
                  onClick={() => {
                    setShowAddGuardsTask(false);
                  }}
                >
                  Буцах
                </button>
              </div>
            </div>
            <div className="pt-[24px] pb-[24px] px-[20px] flex flex-col items-center">
              <div className="w-full flex flex-col gap-[20px]">
                <div className="grid grid-cols-2 gap-[10px] ">
                  <div className="col-span-2 rounded-[14px] bg-[#80FFB714] border border-[#80FFB766] p-4 h-[247px] overflow-y-scroll">
                    <input
                      className="w-full rounded-[14px]  text-[14px] p-4 bg-white/10 text-white/80"
                      placeholder="Ажилтан сонгох"
                      value={searchGuard}
                      onChange={(e) => {
                        setSearchGuard(e.target.value);
                      }}
                      type="text"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workingGuards?.map((guard: any) => {
                        const isSelected = selectedGuards.find(
                          (g) => g._id === guard._id
                        );
                        return (
                          <button
                            key={guard._id}
                            onClick={() => toggleSelectGuard(guard)}
                            className={`px-[10px] h-[50px] w-full  flex justify-between items-center  text-[12px] border border-white/15 bg-white/10 text-white/90 rounded-[14px] gap-[20px] hover:ring-1 hover:ring-[#80FFB7] hover:scale-95 duration-150`}
                          >
                            <img
                              className="w-[30px] h-[30px] rounded-full bg-white/15"
                              src={
                                guard.img_url
                                  ? guard.img_url
                                  : "/image/profile.png"
                              }
                              alt=""
                            />
                            <span className="">
                              {guard?.userId?.lastname} {guard.userId.firstname}
                            </span>
                            <CorrectIcon
                              color={isSelected! ? "#80FFB7" : "#ffffff44"}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <input
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    className="h-[54px] rounded-[14px] bg-white/10 px-[16px] text-white/80 col-span-2 text-[14px] leading-[14px]"
                    placeholder="Үүргийн төрөл"
                    type="text"
                  />
                  <textarea
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                    className="h-[106px] rounded-[14px] bg-white/10 p-[16px] text-white/80 col-span-2 text-[14px] leading-[14px]"
                    placeholder="Тайлбар бичих ..."
                  />
                </div>
              </div>
            </div>
            <div className="absolute w-full flex justify-center bottom-[20px]">
              <button
                onClick={() => onClickaddTaskGuard()}
                className="bg-[#80FFB766] text-[14px] px-8 py-3 rounded-[16px] text-white/80"
              >
                Ажилтанд үүрэг өгөх
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[942px]">
            <OgogdsonUureg />
          </div>
        )}
      </div>
    </div>
  );
}
