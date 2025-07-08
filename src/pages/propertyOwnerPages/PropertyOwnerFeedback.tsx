import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_FEEDBACKS, LIST_USERS } from "../../graphql/queries";

// Icons
import MessengerShigDusaltaiIcon from "../../assets/componentsSvg/messengerShigDusaltaiIcon";
import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";
import BaruunSum from "../../assets/componentsSvg/adminsvg/baruunSumIcon";
import SearchIcon from "../../assets/componentsSvg/adminsvg/searchIcon";
import TailanSumIcon from "../../assets/componentsSvg/adminsvg/tailanSumIcon";

// Components
import WorkingEmployee from "../../components/WorkingEmployee";
import OgogdsonUureg from "../../components/OgogdsonUureg";

// Mock data
const feedbacks = [
  {
    id: 1,
    title: "Сайн ажилтан",
    type: "Урамшуулал",
    description:
      "Уг ажилтан цаг сайн баримталдаг бөгөөд өгсөн үүрэг даалгаварыг цаг тухайд нь сайн биелүүлж байгаа.",
    date: "2025.03.08 20:38",
    employeeName: "Tumurbat Dojpagva",
    profileImg: "/image/profile.png",
  },
  {
    id: 2,
    title: "Муу ажилтан",
    type: "Гомдол",
    description:
      "Уг ажилтан цаг сайн баримталдаггүй бөгөөд өгсөн үүрэг даалгаварыг цаг тухайд нь муу биелүүлж байгаа.",
    date: "2025.03.09 13:10",
    employeeName: "Tumurbat Dojpagva",
    profileImg: "/image/profile.png",
  },
];

export default function PropertyFeedbackPage() {
  const { loading, error } = useQuery(LIST_USERS, {
    variables: { role: "guard" },
    fetchPolicy: "cache-and-network",
  });
  const { data } = useQuery(GET_ALL_FEEDBACKS, {
    fetchPolicy: "cache-and-network",
  });
  const filteredData = data?.getFeedbacks.filter(
    (f: any) => f.propertyId._id === localStorage.getItem("userId")
  );

  const [showSearch, setShowSearch] = useState(false);
  const [filterType, setFilterType] = useState("Бүгд");
  const [selectedReport, setSelectedReport] = useState<
    (typeof filteredData)[0] | null
  >(null);

  const filteredFeedbacks =
    filterType === "Бүгд"
      ? filteredData
      : filteredData.filter((f: any) => f.type === filterType);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-10 gap-[20px] px-4">
      {/* LEFT - FEEDBACK LIST */}
      <div className="col-span-10 2xl:col-span-8 max-h-[942px] pb-4 overflow-hidden rounded-[18px] bg-black/10">
        <div className="w-full h-[56px] custom-background flex justify-between items-center px-[20px] py-[16px]">
          <div className="flex items-center gap-[6px]">
            <MessengerShigDusaltaiIcon />
            <div className="text-white text-[12px]">Нийт санал хүсэлт</div>
            <div className="px-[10px] py-[8px] h-[28px] flex justify-center items-center rounded-[18px] bg-[rgba(255,255,255,0.08)] text-[12px] text-white">
              {filteredFeedbacks && filteredFeedbacks.length}
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            {["Бүгд", "Урамшуулал", "Гомдол"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-[16px] text-[12px] h-[32px] text-center rounded-[12px] ${
                  filterType !== type
                    ? "bg-white/10 text-white"
                    : "border border-[#80FFB766] bg-[#80FFB714] text-white/80"
                }`}
              >
                {type}
              </button>
            ))}
            {/* SEARCH */}
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

        {/* HEADER */}
        <div className="p-5">
          <header className="w-full flex justify-between pl-[50px] pr-[98px] h-[44px] bg-black/10 items-center text-white/60 text-[10px] rounded-[14px]">
            <div className="flex">
              <span className="flex gap-[4px]">
                ГАРЧИГ <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[71px]">
                ХҮСЭЛТИЙН ТӨРӨЛ <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[32px]">
                ТАЙЛБАР <DooshooZaasanSum />
              </span>
            </div>
            <div className="flex">
              <span className="flex gap-[4px]">
                ИЛГЭЭСЭН ОГНОО <DooshooZaasanSum />
              </span>
              <span className="flex gap-[4px] ml-[43px]">
                ХОЛБОГДОХ АЖИЛТАН <DooshooZaasanSum />
              </span>
            </div>
          </header>

          {/* FEEDBACK LIST */}
          <main className="py-[10px] flex flex-col gap-[10px]">
            {filteredFeedbacks?.map((feedback: any, index: number) => (
              <div
                key={feedback.id}
                onClick={() => setSelectedReport(feedback)}
                className={`w-full relative h-[58px] rounded-[14px] border pl-[16px] pr-[18px] flex items-center text-[14px] text-white/80 cursor-pointer ${
                  feedback.type === "negative"
                    ? "bg-[#F6C32414] border-[#F6C32466]"
                    : "bg-[#80FFB714] border-[#80FFB766]"
                }`}
              >
                <div className="flex gap-[10px] items-center">
                  <div className="w-6 h-6 rounded-full text-[10px] text-white/80 bg-white/10 flex justify-center items-center">
                    {index + 1}
                  </div>
                  <span className="w-[93px] text-ellipsis overflow-hidden whitespace-nowrap">
                    {feedback.title}
                  </span>
                </div>
                <div
                  className={`w-[98px] px-[16px] ml-[30px] text-[12px] h-[32px] text-center text-white/80 rounded-[8px] flex items-center justify-center border ${
                    feedback.type === "positive"
                      ? "bg-[#80FFB714] border-[#80FFB766]"
                      : "border-[#F6C32414] bg-[#F6C32466]"
                  }`}
                >
                  {feedback.type === "positive" ? "Урамшуулах" : ""}
                  {feedback.type === "negative" ? "Гомдол" : ""}
                </div>
                <span className="ml-[45px] w-[680px] overflow-hidden whitespace-nowrap text-ellipsis">
                  {feedback.desc}
                </span>
                <span className="ml-[10px]">
                  {
                    new Date(parseInt(feedback.createdAt))
                      .toISOString()
                      .split("T")[0]
                  }
                </span>
                <div className="flex items-center gap-[8px] ml-[40px]">
                  <img
                    src={feedback.toUserId.profilePic}
                    className="w-[30px] h-[30px] rounded-full ml-[20px]"
                    alt=""
                  />
                  <span>
                    {feedback.toUserId.lastname} {feedback.toUserId.firstname}
                  </span>
                </div>
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
                <MessengerShigDusaltaiIcon />
                Хүсэлтийн тайлбар
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-xs text-white underline"
              >
                Буцах
              </button>
            </div>
            <div className="p-5 flex flex-col gap-[16px] h-[886px]">
              <div className="w-full border border-white/15 p-[16px] flex flex-col gap-[10px] rounded-[14px]">
                <label className="text-white/40 text-[12px]">
                  Холбогдох ажилтан
                </label>
                <div className="h-[50px] text-[14px] text-white/80 flex gap-[10px] items-center bg-white/10 rounded-[14px] px-[10px]">
                  <div className="border w-[30px] h-[30px] rounded-full relative border-[#80FFB766]">
                    <img
                      className="h-full w-full rounded-full"
                      src={selectedReport.toUserId.profilePic}
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#80FFB7] absolute right-0 bottom-0" />
                  </div>
                  {selectedReport.toUserId.firstname}{" "}
                  {selectedReport.toUserId.lastname}
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/15" />
              <div className="flex flex-col gap-[10px]">
                {[
                  { label: "Гарчиг", value: selectedReport.title },
                  { label: "Хүсэлтийн төрөл", value: selectedReport.type },
                  {
                    label: "Илгээсэн огноо",
                    value: new Date(parseInt(selectedReport.createdAt))
                      .toISOString()
                      .split("T")[0],
                  },
                ].map(({ label, value }, i) => (
                  <div
                    key={i}
                    className="w-full h-[54px] rounded-[14px] bg-white/10 px-[16px] flex flex-col justify-center gap-[5px]"
                  >
                    <label className="text-[12px] text-white/40">{label}</label>
                    <p className="text-[14px] text-white/80">{value}</p>
                  </div>
                ))}
                <div className="w-full rounded-[14px] bg-white/10 px-[16px] py-4">
                  <p className="text-[14px] text-white/80">
                    {selectedReport.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-[562px]">
              <WorkingEmployee />
            </div>
            <div className="w-full h-[360px]">
              <OgogdsonUureg />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
