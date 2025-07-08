import { useMutation } from "@apollo/client";
import ChatShigIcon from "../../assets/componentsSvg/adminsvg/chatShigIcon";
import EditIcon from "../../assets/componentsSvg/adminsvg/editIcon";
import ProfileShigIcon from "../../assets/componentsSvg/adminsvg/profileShigIcon";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import DooshooZaasanBultsgarSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanBultsgarSum";
import "../../index.css";
import CorrectIcon from "../../assets/componentsSvg/adminsvg/correctIcon";
import { TIME_ENTRY, WORK_ENTRY } from "../../graphql/mutations";
import Input from "../layouts/Input";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
export default function PropertyOwnerGuardSelect({
  guards,
}: {
  guards: any[];
}) {
  const [nextStep, setNextStep] = useState(false);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    selectedDays: [] as dayjs.Dayjs[],
    shiftType: "24tsag48tsag",
    startTime: "",
    endTime: "",
    guards: [] as any[],
    guardSalaries: {} as Record<string, number>, // шинэ утга
  });
  const [createWorkEntry] = useMutation(WORK_ENTRY);
  const [createTimeEntry, { loading }] = useMutation(TIME_ENTRY);

  const filteredGuards = guards?.filter((item) =>
    `${item.firstname} ${item.lastname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleGuardClick = (item: any) => {
    setFormData((prev) => {
      const alreadySelected = prev.guards.some((g) => g._id === item._id);
      return {
        ...prev,
        guards: alreadySelected
          ? prev.guards.filter((g) => g._id !== item._id)
          : [...prev.guards, item],
      };
    });
  };

  const handleShiftChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      shiftType: value,
      ...(value !== "duriinTsag" && { startTime: "", endTime: "" }),
    }));
  };
  useEffect(() => {
    if (formData.shiftType === "24tsag48tsag" && formData.startTime) {
      setFormData((prev) => ({
        ...prev,
        endTime: prev.startTime,
      }));
    }
  }, [formData.shiftType, formData.startTime]);

  async function createMutations() {
    try {
      for (const guard of formData.guards) {
        for (const day of formData.selectedDays) {
          const date = dayjs(day);

          const start = date
            .set("hours", Number(formData.startTime.split(":")[0]))
            .set("minutes", Number(formData.startTime.split(":")[1]))
            .toISOString();
          const end = date
            .add(formData.endTime === formData.startTime ? 1 : 0, "days")
            .set("hours", Number(formData.endTime.split(":")[0]))
            .set("minutes", Number(formData.endTime.split(":")[1]))
            .toISOString();

          const { data: workEntryData } = await createWorkEntry({
            variables: {
              userId: localStorage.getItem("adminId"),
              propertyId: id,
              checkInTime: start,
              checkOutTime: end,
              // status: "accepted",
              salary: Number(formData.guardSalaries[guard._id] || 0),
            },
          });

          const workEntryId = workEntryData?.createWorkEntry?._id;

          if (workEntryId) {
            await createTimeEntry({
              variables: {
                userId: guard._id,
                propertyId: id,
                workEntryId,
              },
            })
              .then(() => {
                alert(`${guard?.firstname} -д амжилттай ажилд томиллоо.`);
              })
              .catch((err) => {
                console.error(err);
                alert(`${guard?.fistname} -д Алдаа гарлаа. Дахин оролдоно уу.`);
              });
          }
        }
      }
    } catch (error) {
      console.error("Томилолт алдаа гарлаа:", error);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  }

  return nextStep ? (
    <div className="w-full h-full bg-black/15 rounded-[18px] overflow-hidden relative">
      <div className="px-[18px] h-[56px] flex items-center justify-between bg-black/15">
        <div className="flex items-center gap-[16px]">
          <ProfileShigIcon />
          <div className="text-white/90">Ажилтан нэмэх</div>
        </div>
        <div className="flex items-center gap-[10px]">
          <button>
            <ChatShigIcon opacity="0.3" />
          </button>
          <button>
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="pt-[24px] pb-[24px] px-[20px] flex flex-col items-center h-[800px] ">
        <div className="text-white/80 w-full h-full flex flex-col gap-[20px] ">
          {formData?.guards?.map((guard, i) => (
            <div
              // onClick={() => handleGuardClick(guard)}
              className="rounded-[14px] bg-white/10 p-[10px] flex flex-col gap-[10px] border border-white/15 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-[30px] h-[30px] rounded-full border relative border-[#80FFB766]">
                    <img
                      src="/image/profile.png"
                      alt=""
                      className="rounded-full"
                    />
                    <div className="w-[10px] h-[10px] bg-[#80FFB7] rounded-full absolute bottom-0 right-0" />
                  </div>
                  <div className="text-[14px] leading-[14px] text-white/80">
                    {guard.firstname} {guard.lastname}
                  </div>
                </div>
                {/* {isSelected && <CorrectIcon />} */}
              </div>
              <div className="w-full h-[1px] bg-white/15" />
              <div className="flex items-center gap-[6px] overflow-auto">
                {formData?.selectedDays?.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-[10px] py-[5px] border border-white/15 rounded-[8px] bg-white/10 text-[12px] flex gap-[10px] "
                  >
                    <div>
                      {dayjs(item).format("MM").split("/")[0]}.
                      {dayjs(item).format("DD").split("/")[0]}
                    </div>
                  </div>
                ))}
              </div>
              <Input
                placeHolder="Гарааны цалин ₮"
                type="number"
                setValue={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    guardSalaries: {
                      ...prev.guardSalaries,
                      [guard._id]: Number(val), // ID-гээр хадгалах
                    },
                  }))
                }
                value={formData.guardSalaries[guard._id] || ""}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-[70px] absolute bottom-[20px] left-1/2 -translate-x-1/2">
          <button
            onClick={() => {
              createMutations();
            }}
            className={`text-white/80 rounded-[16px] px-8 py-3 bg-green-300 text-[14px] whitespace-nowrap `}
          >
            Ажилтан томилох
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full bg-black/15 rounded-[18px] overflow-hidden">
      <div className="px-[18px] h-[56px] flex items-center justify-between bg-black/15">
        <div className="flex items-center gap-[16px]">
          <ProfileShigIcon />
          <div className="text-white/90">Ажилтан нэмэх</div>
        </div>
        <div className="flex items-center gap-[10px]">
          <button>
            <ChatShigIcon opacity="0.3" />
          </button>
          <button>
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="pt-[24px] pb-[24px] px-[20px] flex flex-col items-center">
        <div className="w-full flex flex-col gap-[20px]">
          <DayPicker
            mode="multiple"
            selected={formData.selectedDays.map((e) => e.toDate())}
            onSelect={(days) => {
              const uniqueDays = Array.from(
                new Set((days || []).map((d) => dayjs(d).format("YYYY-MM-DD")))
              ).map((dateStr) => dayjs(dateStr));

              setFormData((prev) => ({ ...prev, selectedDays: uniqueDays }));
            }}
            weekStartsOn={1}
            className="custom-calendar text-white/80"
            modifiersClassNames={{
              selected: "selected-day",
              today: "today",
            }}
            disabled={{ before: dayjs().toDate() }}
          />

          <div className="w-full h-[1px] bg-white/15" />

          <div className="relative w-full">
            <select
              value={formData.shiftType}
              onChange={handleShiftChange}
              className="w-full h-[54px] text-[14px] rounded-[14px] bg-white/10 text-white/80 px-[16px] appearance-none pr-10 outline-none focus:ring-[1px] focus:ring-[#80FFB766]"
            >
              <option value="24tsag48tsag">24/48</option>
              <option value="duriinTsag">Дурын цагаар</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
              <DooshooZaasanBultsgarSum />
            </div>
          </div>

          {formData.shiftType !== "udriin8tsag" && (
            <div className="w-full grid grid-cols-2 gap-[10px]">
              <Input
                value={formData.startTime}
                setValue={(val) =>
                  setFormData((prev) => ({ ...prev, startTime: val }))
                }
                type="time"
                placeHolder="Эхлэх цаг"
              />
              <Input
                value={formData.endTime}
                setValue={(val) =>
                  setFormData((prev) => ({ ...prev, endTime: val }))
                }
                type="time"
                placeHolder="Дуусах цаг"
              />
            </div>
          )}

          <div className="border border-[#80FFB766] bg-[#80FFB714] rounded-[14px] px-[16px] pt-[14px] pb-[16px]">
            <div className="text-[12px] text-white/40">Ажилтан сонгох</div>
            <input
              placeholder="Ажилтан хайх"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-white/0 text-white/80 text-[14px] mb-[10px] mt-[8px]"
            />
            <div className="max-h-[230px] overflow-y-scroll p-[1px]">
              {filteredGuards?.map((item) => {
                const isSelected = formData.guards.some(
                  (g) => g._id === item._id
                );
                return (
                  <div key={item._id}>
                    <div
                      onClick={() => handleGuardClick(item)}
                      className="rounded-[14px] ring-[1px] ring-[#80FFB766] p-[10px] flex flex-col gap-[10px] cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="w-[30px] h-[30px] rounded-full border relative border-[#80FFB766]">
                            <img
                              src="/image/profile.png"
                              alt=""
                              className="rounded-full"
                            />
                            <div className="w-[10px] h-[10px] bg-[#80FFB7] rounded-full absolute bottom-0 right-0" />
                          </div>
                          <div className="text-[14px] leading-[14px] text-white/80">
                            {item.firstname} {item.lastname}
                          </div>
                        </div>
                        {isSelected && <CorrectIcon />}
                      </div>
                      <div className="w-full h-[1px] bg-white/15" />
                      <div className="flex items-center gap-[6px]">
                        <div className="border border-[#80FFB766] rounded-[8px] py-2 px-[14px] bg-[#80FFB714] text-[12px] leading-[12px] text-white/80">
                          Идэвхтэй
                        </div>
                        <div className="rounded-[8px] py-2 px-[14px] bg-white/15 text-[12px] leading-[12px] text-white/80">
                          Хэвийн ажилтан
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-white/15 my-[10px]" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setNextStep(true)}
              disabled={formData.guards.length === 0}
              className={`text-white/80 rounded-[16px] px-8 py-3 text-[14px] ${
                formData.guards.length === 0
                  ? "bg-white/15 cursor-not-allowed"
                  : "bg-[#80FFB714] hover:bg-[#80FFB733]"
              }`}
            >
              Дараагийн алхам
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
