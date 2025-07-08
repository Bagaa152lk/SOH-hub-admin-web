"use client"; // Marking this file as a client-side component

import { useEffect, useState } from "react";

import { REGISTER_USER } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import ProfileShigIcon from "../assets/componentsSvg/adminsvg/profileShigIcon";
import ChatShigIcon from "../assets/componentsSvg/adminsvg/chatShigIcon";
import EditIcon from "../assets/componentsSvg/adminsvg/editIcon";
import TrashCanIcon from "../assets/componentsSvg/adminsvg/trashCanIcon";
import PlusIcon from "../assets/componentsSvg/adminsvg/plusIcon";
import { GET_PROPERTIES } from "../graphql/queries";
import CorrectIcon from "../assets/componentsSvg/adminsvg/correctIcon";
import DooshooZaasanBultsgarSum from "../assets/componentsSvg/adminsvg/dooshooZaasanBultsgarSum";
import Input from "./layouts/Input";
import Toast from "./toast/Toast";
import Lottie from "lottie-react";
import loadingSideBar from "../lottie/loading-side-bar.json";
import SideBarLoading from "./loading/SideBarLoading";
interface ScheduleEntry {
  day: string;
  startTime: string;
  endTime: string;
}

const AddGuard = ({ refetch }: { refetch: any }) => {
  // State hooks for schedule management
  // const [schedule, setSchedule] = useState<ScheduleEntry[]>([
  //   { day: "Даваа", startTime: "09:00", endTime: "18:00" },
  // ]);
  // const [day, setDay] = useState<string>("");
  // const [startTime, setStartTime] = useState<string>("");
  // const [endTime, setEndTime] = useState<string>("");
  // const [showAddWorkingTime, setShowAddWorkingTime] = useState<boolean>(false);
  // const [searchProperty, setSearchProperty] = useState("");
  // State hooks for employee data
  const [isActive, setIsActive] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);

  const [age, setAge] = useState<number | string | null>(null);
  // const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
  //   null
  // );

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  useEffect(() => {
    if (
      firstname.length >= 3 &&
      lastname.length >= 3 &&
      gender.trim() !== "" &&
      salary.trim() !== "" &&
      age !== null
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstname, lastname, gender, phone, salary, age]);

  // const { data } = useQuery(GET_PROPERTIES, {
  //    fetchPolicy: "cache-and-network",

  // });

  // // Add a new schedule entry
  // const addScheduleEntry = () => {
  //   setSchedule([...schedule, { day, startTime, endTime }]);
  //   setShowAddWorkingTime(false);
  // };

  // // Remove a schedule entry
  // const removeScheduleEntry = (index: number) => {
  //   setSchedule(schedule.filter((_, i) => i !== index));
  // };

  // Handle form submission
  const handleSubmit = async () => {
    const isoBirthdate = new Date(age as string).toISOString(); // Convert to ISO 8601

    const userData = {
      password: `${phone}`,
      firstname,
      lastname,
      gender,
      phone,
      birthdate: isoBirthdate,
      // salary: salary.toString(),
      role: "guard",
    };

    try {
      const { data } = await registerUser({ variables: { user: userData } });

      setShowToast(true);
      setToastStatus(true);
      refetch();

      setAge(null);
      setFirstname("");
      setLastname("");
      setGender("");
      setSalary("");
      setPhone("");
    } catch (e) {
      setShowToast(true);

      setToastStatus(false);

      console.error("Error:", e);
    }
  };
  if (loading) return <SideBarLoading />;

  return (
    <div className="w-full h-full bg-black/15 rounded-[18px] overflow-hidden relative">
      {showToast && (
        <Toast status={toastStatus} onClose={() => setShowToast(false)} />
      )}

      <div className="px-[18px] h-[56px] flex items-center justify-between bg-black/15">
        <div className="flex items-center gap-[16px]">
          <ProfileShigIcon />
          <div className="text-white/90">Ажилтаны тухай</div>
        </div>

        <div className="flex items-center gap-[10px]">
          <button className="scale-110">
            <ChatShigIcon opacity="0.3" />
          </button>
        </div>
      </div>
      <div className="pt-[24px] pb-[24px] px-[20px] flex flex-col items-center ">
        <div className="w-full flex flex-col gap-[20px]">
          <div className="w-full flex flex-col items-center gap-[20px]">
            <img
              className="rounded-full w-[84px] h-[84px]"
              src="/image/profile.png"
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <Input
              className="col-span-2"
              placeHolder="Ажилтаны овог"
              value={lastname}
              setValue={setLastname}
            />
            <Input
              className="col-span-2"
              placeHolder="Ажилтаны нэр"
              value={firstname}
              setValue={setFirstname}
            />

            <div className="relative col-span-2 w-full h-[54px]">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="appearance-none text-white/50 text-[12px] px-[16px] pr-[40px] w-full h-full  flex items-center gap-[10px] bg-white/10 rounded-[14px]"
              >
                <option value="">Хүйс</option>
                <option value="male">Эрэгтэй</option>
                <option value="female">Эмэгтэй</option>
              </select>
              {/* Custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-[12px] flex items-center">
                <DooshooZaasanBultsgarSum color="#FFFFFF66" />
              </div>
            </div>
            <Input
              className="col-span-2"
              placeHolder="Төрсөн он сар өдөр"
              value={age}
              setValue={setAge}
              type="date"
            />
            <Input
              className="col-span-2"
              placeHolder="Утасны дугаар"
              value={phone}
              setValue={setPhone}
            />
            <Input
              className="col-span-2"
              placeHolder="Цалин хөлс ₮"
              value={salary}
              setValue={setSalary}
            />
          </div>
          <div className="w-full h-[1px] bg-white/15" />
          {/* <div className="flex flex-col gap-[10px]">
            <div className="text-center text-[12px] leading-[12px] text-white/70">
              Ажиллах хуваарь
            </div>
            <div className="max-h-[134px] overflow-y-scroll flex flex-col items-start gap-[10px]">
              <div className="col-span-2 flex flex-col gap-[8px] items-center">
                {schedule.map((entry, index) => (
                  <div key={index} className="flex items-center gap-[8px]">
                    <div className="text-[12px] h-[40px] text-white/90 bg-white/5 border px-[14px] flex items-center border-white/15 rounded-[14px] w-[108px]">
                      {entry.day}
                    </div>
                    <div className="text-[12px] h-[40px] text-white/90 bg-white/5 border flex items-center justify-center border-white/15 rounded-[14px] w-[61px]">
                      {entry.startTime}
                    </div>
                    <div className="text-[12px] h-[40px] text-white/90 bg-white/5 border flex items-center justify-center border-white/15 rounded-[14px] w-[61px]">
                      {entry.endTime}
                    </div>
                    <button onClick={() => removeScheduleEntry(index)}>
                      <TrashCanIcon />
                    </button>
                  </div>
                ))}
              </div>
              {showAddWorkingTime ? (
                <div className="col-span-2 flex gap-[8px] items-center">
                  <select
                    className="text-white/90 text-[12px] w-[108px] pl-[16px] h-[40px] flex items-center gap-[10px] employeeTableListBG-border"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option value="Даваа" className="text-black text-[12px]">
                      Даваа
                    </option>
                    <option value="Мягмар" className="text-black text-[12px]">
                      Мягмар
                    </option>
                    <option value="Лхагва" className="text-black text-[12px]">
                      Лхагва
                    </option>
                    <option value="Пүрэв" className="text-black text-[12px]">
                      Пүрэв
                    </option>
                    <option value="Баасан" className="text-black text-[12px]">
                      Баасан
                    </option>
                    <option value="Бямба" className="text-black text-[12px]">
                      Бямба
                    </option>
                    <option value="Ням" className="text-black text-[12px]">
                      Ням
                    </option>
                  </select>
                  <input
                    onChange={(e) => setStartTime(e.target.value)}
                    className="text-[12px] h-[40px] text-white/90 bg-white/5 border border-white/15 rounded-[14px] w-[61px]"
                    type="time"
                    value={startTime}
                  />
                  <input
                    onChange={(e) => setEndTime(e.target.value)}
                    className="text-[12px] h-[40px] text-white/90 bg-white/5 border border-white/15 rounded-[14px] w-[61px]"
                    type="time"
                    value={endTime}
                  />
                  <button onClick={addScheduleEntry}>
                    <PlusIcon />
                  </button>
                </div>
              ) : null}
              {!showAddWorkingTime ? (
                <div
                  className="text-[12px] min-h-[34px] text-white/90 bg-white/5 border px-[14px] flex items-center justify-center border-white/15 rounded-[14px] w-[108px]"
                  onClick={() => {
                    setShowAddWorkingTime(true);
                  }}
                >
                  <PlusIcon width="18px" height="18px" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full h-[1px] bg-white/15" /> */}
          {/* <div className="col-span-2 min-h-[125px] border border-[#80ffb7] border-opacity-30 px-[18px] py-[14px] rounded-[14px] bg-white/5">
            <label className="text-[12px] text-white/50 bg-white/0">
              Объектэд хувиарлах
            </label>
            <input
              onChange={(e) => setSearchProperty(e.target.value)}
              value={searchProperty}
              type="text"
              placeholder="Объектийн нэр хайх..."
              className="text-white/90 text-[14px] col-span-2 pl-[16px] w-full h-[44px] flex items-center gap-[10px] bg-white/0 border-b-[1px] border-white/15"
            />
            <div className="mt-[10px] flex flex-col gap-[6px] max-h-[80px] overflow-y-auto">
              {data?.getProperties
                ?.filter((property: any) =>
                  property.name
                    ?.toLowerCase()
                    .includes(searchProperty.toLowerCase())
                )
                .map((property: any, idx: number) => {
                  const isSelected = selectedPropertyId === property._id;

                  return (
                    <div
                      key={idx}
                      className={`bg-white/15 hover:bg-white/25 cursor-pointer rounded-[8px] min-h-[30px] inline-flex justify-between items-center px-[10px] text-[12px] text-white/80 leading-[12px]`}
                      onClick={() => {
                        setSelectedPropertyId(property._id);
                      }}
                    >
                      {property.name}
                      {isSelected ? (
                        <CorrectIcon width="12px" height="12px" />
                      ) : (
                        <PlusIcon width="12px" height="12px" />
                      )}
                    </div>
                  );
                })}
            </div>
          </div> */}
          {/* <input
            type="text"
            className="col-span-2 h-[54px] bg-white/10 rounded-[14px] px-[20px] text-white/80 outline-none focus:ring-[1px] focus:ring-[#80FFB7]"
            placeholder="Хариуцсан объект"
          /> */}
        </div>
      </div>
      <div className="flex justify-center mb-[20px] ">
        <button
          disabled={!isActive}
          onClick={handleSubmit}
          className={`text-[14px] rounded-[16px]  w-[181px] h-[42px] ${
            isActive === true
              ? "bg-[#80FFB7CC] text-white"
              : "bg-white/15 text-white"
          }`}
        >
          Ажилтаныг нэмэх
        </button>
      </div>
    </div>
  );
};

export default AddGuard;
