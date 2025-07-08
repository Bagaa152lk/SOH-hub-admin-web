import { use, useEffect, useState } from "react";
import AgeIcon from "../assets/componentsSvg/adminsvg/ageIcon";
import BaruunDeesheSum from "../assets/componentsSvg/adminsvg/baruunDeesheSum";
import BaruunTiishHarsanSum from "../assets/componentsSvg/adminsvg/baruunTiishHarsanSum";
import ChatShigIcon from "../assets/componentsSvg/adminsvg/chatShigIcon";
import ClockIcon from "../assets/componentsSvg/adminsvg/clockIcon";
import DollarIcon from "../assets/componentsSvg/adminsvg/dollarIcon";
import EditIcon from "../assets/componentsSvg/adminsvg/editIcon";
import EmployeeStatusIcon from "../assets/componentsSvg/adminsvg/employeeStatusIcon";
import GenderIcon from "../assets/componentsSvg/adminsvg/genderIcon";
import Location from "../assets/componentsSvg/adminsvg/location";
import ObjectPositionIcon from "../assets/componentsSvg/adminsvg/objectPositionIcon";
import ProfileShigIcon from "../assets/componentsSvg/adminsvg/profileShigIcon";
import UtasniIcon from "../assets/componentsSvg/utasniIcon";
import ZuunTiishHarsanSum from "../assets/componentsSvg/zuunTiishHarsanSum";
import { EmployeeData } from "../type/type";
import EmployeeNavigationList from "./layouts/EmployeeNavigationList";
import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import {
  GET_REQUESTS,
  GET_TIME_ENTRIES_SEARCH_JSON,
  LIST_USERS,
  ME,
} from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REQUEST } from "../graphql/mutations";
import ToolIcon from "../assets/componentsSvg/toolIcon";
import Toast from "./toast/Toast";

export default function GuardDetails({ employee }: any) {
  const [showUureg, setShowUureg] = useState(false);
  const [searchGuard, setSearchGuard] = useState("");
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);

  const [createRequest] = useMutation(REQUEST);

  const { loading, error, data } = useQuery(LIST_USERS, {
    variables: { role: "guard" },
    fetchPolicy: "cache-and-network",
  });

  const {
    loading: timeEntriesLoading,
    error: timeEntriesError,
    data: timeEntriesData,
  } = useQuery(GET_TIME_ENTRIES_SEARCH_JSON, {
    variables: {
      search: { userId: employee._id },
    },
    fetchPolicy: "cache-and-network",
  });

  const filteredGuards =
    data?.listUsers.filter((user: any) =>
      `${user.firstname} ${user.lastname}`
        .toLowerCase()
        .includes(searchGuard.toLowerCase())
    ) || [];
  useEffect(() => {
    setSearchGuard(employee.lastname?.split(" ")[0] || "Default Name");
  }, [employee]);

  function uuregOgoh() {
    setShowUureg(!showUureg);
  }

  const thisTimeEntry = timeEntriesData?.getTimeEntries.find(
    (item: any) => item?.userId?._id === employee._id
  );

  async function onclickeee() {
    const isAccepted = timeEntriesData?.getTimeEntries.some((time: any) => {
      return time.userId._id === employee._id && time.status === "checkedIn";
    });

    if (!isAccepted) {
      alert("Тухайн ажилтны бүртгэл олдсонгүй эсвэл зөвшөөрөгдөөгүй.");
      return;
    }
    const reqData = {
      userId: localStorage.getItem("adminId"),
      propertyId: thisTimeEntry.propertyId._id,
      toUserId: employee._id,
      type: "guard",
      status: "unresolved",
      title: title,
      desc: description,
    };
    try {
      setShowToast(true);
      const { data } = await createRequest({ variables: reqData });
      if (data?.createRequest) {
        setToastStatus(true);
      } else {
        setToastStatus(false);
      }
    } catch (e) {
      setShowToast(true);
      console.error("error", e);
    }
    setTitle("");
    setDescription("");
    setSearchGuard("");
    setShowUureg(false);
    // alert("Амжилттай үүрэг өглөө.");
  }

  return showUureg ? (
    <div className="w-full h-[884px] relative bg-black/15 rounded-[18px] overflow-hidden flex flex-col">
      <div className="px-[18px] h-[56px] flex items-center justify-between bg-black/15">
        <div className="flex items-center gap-[16px]">
          <ProfileShigIcon />

          <div className="text-white/90">Ажилтаны тухай</div>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            className="scale-110 text-[12px] underline text-white/80"
            onClick={() => {
              uuregOgoh();
            }}
          >
            {/* <ChatShigIcon opacity="0.3" /> */}
            Буцах
          </button>
        </div>
      </div>
      <div className="pt-[24px] pb-[24px] px-[20px] flex flex-col items-center">
        <div className="w-full flex flex-col gap-[20px]">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="col-span-2 rounded-[14px] bg-[#80FFB714] border border-[#80FFB766] p-4">
              <div className="flex flex-wrap gap-2 mt-2">
                <div
                  className={`px-[10px] h-[50px] w-full  flex justify-between items-center  text-[12px] border border-white/15 bg-white/10 text-white/90 rounded-[14px] gap-[20px]  `}
                >
                  <img
                    className="w-[30px] h-[30px] rounded-full bg-white/15"
                    src={
                      employee.img_url ? employee.img_url : "/image/profile.png"
                    }
                    alt=""
                  />
                  <span className="">{employee.name}</span>
                  <CorrectIcon color={"#80FFB7"} />
                </div>
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
          onClick={() => onclickeee()}
          className="bg-[#80FFB766] text-[14px] px-8 py-3 rounded-[16px] text-white/80"
        >
          Ажилтанд үүрэг өгөх
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full  bg-black/15 rounded-[18px] overflow-hidden">
      {showToast && (
        <Toast status={toastStatus} onClose={() => setShowToast(false)} />
      )}
      <div className="px-[18px] h-[56px] flex items-center justify-between bg-black/15">
        <div className="flex items-center gap-[16px]">
          <ProfileShigIcon />

          <div className="text-white/90">Ажилтаны тухай</div>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            onClick={() => {
              uuregOgoh();
            }}
          >
            <ToolIcon />
          </button>
        </div>
      </div>
      <div className="pt-[24px] pb-[24px] px-[20px] flex flex-col items-center">
        <div className="w-full flex flex-col gap-[20px]">
          <div className="w-full flex flex-col items-center gap-[20px]">
            <img
              className="rounded-full w-[84px] h-[84px] border border-green-300"
              src={employee.profilePic ?? "/image/profile.png"}
              alt=""
            />
            <div className="text-white/90">
              {" "}
              {employee?.firstname}
              {employee?.lastname}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="col-span-2 pl-[16px] h-[44px] text-[14px] leading-[14px] flex items-center gap-[10px] employeeTableListBG-border">
              <Location />
              <span className="text-white/90">
                {/* {employee?.property | "Gerlug Vista"} */}
                Gerlug Vista
              </span>
            </div>
            <div className="col-span-2 pl-[16px] h-[44px] flex items-center gap-[10px] text-[14px] leading-[14px] employeeTableListBG-border">
              <UtasniIcon />
              <span className="text-white/90">
                {employee?.phoneNumber}
                {employee?.phone}
              </span>
            </div>
            <div className="col-span-2 pl-[16px] h-[44px] flex items-center gap-[10px] text-[14px] leading-[14px] employeeTableListBG-border">
              <GenderIcon />
              <span className="text-white/90">
                {employee?.gender === "male" ? "Эрэгтэй" : null}
                {employee?.gender === "female" ? "Эмэгтэй" : null}
                {employee?.gender === "other" ? "Бусад" : null}
                {employee?.gender === null ? "Хүйс тодорхойгүй" : null}
              </span>
            </div>
            <div className="col-span-2  pl-[16px] h-[44px] flex items-center gap-[10px] text-[14px] leading-[14px] employeeTableListBG-border">
              <AgeIcon />
              <span className="text-white/90">
                {employee?.birthdate?.split("T")[0]}
              </span>
            </div>
            <div className="col-span-2  pl-[16px] h-[44px] flex items-center gap-[10px] text-[14px] leading-[14px] employeeTableListBG-border">
              <ObjectPositionIcon />
              <div className="flex  gap-[6px] text-white/80 text-[14px]">
                {/* {employee?.assignedObject?.map((obj: any, i: number) => (
                  <div
                    key={i}
                    className="px-[12px] text-[12px] h-[28px] flex items-center gap-[4px] whitespace-nowrap rounded-[8px] custom-background text-white/90 font-[400] bg-[#FFFFFF14] text-center "
                  >
                    {obj}
                  </div>
                ))} */}
                -{" "}
              </div>
            </div>
            <div className="col-span-2 pl-[16px] h-[44px] flex items-center gap-[10px] employeeTableListBG-border rounded-[8px]">
              <EmployeeStatusIcon />
              <span
                className={`text-white/90 px-[14px] h-[28px] text-[12px] flex items-center  rounded-[8px] ${
                  employee?.disciplinaryStatus === "Хэвийн ажилтан"
                    ? "bg-[#80FFB729] !important"
                    : null
                }  ${
                  employee?.disciplinaryStatus === "Журамын зөрчилтэй"
                    ? "bg-[#E5393529] !important"
                    : null
                }`}
              >
                -{employee?.disciplinaryStatus || null}
              </span>
            </div>
          </div>
          {/* burtgel */}
          <div className="pt-[12px]  flex flex-col gap-[7px] border-t-[1px] border-[#ffffff14]">
            {/* table head */}
            <div className=" employeeTableListBG-border h-[82px]">
              <div className="px-[15px] h-[45px] flex items-center justify-between">
                <ZuunTiishHarsanSum />
                <span className="text-center text-[14px] text-white/90 font-[400]">
                  -.-.- - -.-
                </span>
                <BaruunTiishHarsanSum />
              </div>
              <div className="w-full h-[1px] bg-[#ffffff14]" />
              <div className="px-[15px] h-[36px] items-center grid grid-cols-4">
                <div className="text-white/90 font-[400] text-[10px] leading-[8px] uppercase">
                  АЖ/ӨДӨР
                </div>
                <div className="text-white/90 flex justify-center font-[400] text-[10px] leading-[8px] uppercase">
                  ир/цаг
                </div>
                <div className="text-white/90 flex justify-center font-[400] text-[10px] leading-[8px] uppercase">
                  Яв/Цаг
                </div>
                <div className="text-white/90 flex justify-end font-[400] text-[10px] leading-[8px] uppercase">
                  Хоц/мин
                </div>
              </div>
            </div>
            {/* table list */}
            <div className="flex flex-col gap-[6px] ">
              <EmployeeNavigationList />
              {/* <EmployeeNavigationList /> */}
            </div>
          </div>
          <div className="w-full h-[1px] bg-white/15" />
          <div className="flex flex-col gap-[10px]">
            <div className="px-[16px] h-[44px] flex items-center justify-between employeeTableListBG-border">
              <div className="flex items-center gap-[10px]">
                <ClockIcon />
                <span className="text-white/90 text-[14px]">Нийт цаг</span>
              </div>
              <div className="text-white/90 text-[14px]">-</div>
            </div>
            <div className="px-[16px] h-[44px] flex items-center justify-between employeeTableListBG-border">
              <div className="flex items-center gap-[10px]">
                <BaruunDeesheSum color="#80FFB7" width="16px" height="16px" />
                <span className="text-white/90 text-[14px]">Нийт илүү цаг</span>
              </div>
              <div className="text-white/90 text-[14px]">-</div>
            </div>
            <div className="px-[16px] h-[44px] flex items-center justify-between employeeTableListBG-border">
              <div className="flex items-center gap-[10px]">
                <DollarIcon />
                <span className="text-white/90 text-[14px]">Олгох цалин</span>
              </div>
              <div className="text-white/90 text-[14px]">-</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
