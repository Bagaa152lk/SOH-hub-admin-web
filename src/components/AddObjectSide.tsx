import { useState } from "react";
import PlusIcon from "../assets/componentsSvg/adminsvg/plusIcon";
import Input from "./layouts/Input";
import Maps from "./Maps";
import { CREATE_PROPERTY, REGISTER_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import ZuragInput from "./mayIluu/zuragInput";
import Toast from "./toast/Toast";
export default function AddObjectSide() {
  const [step, setStep] = useState<number>(1);
  const [createProperty] = useMutation(CREATE_PROPERTY);

  const [manager, setManager] = useState<string>("");
  const [propertyName, setPropertyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sohName, setSohName] = useState<string>("");
  const [orshinSuugchdiinToo, setOrshinSuugchdiinToo] = useState<
    number | undefined
  >(undefined);
  const [location, setLocation] = useState<string>("");
  const [registerUser] = useMutation(REGISTER_USER);
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>();
  const [cost, setCost] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<string>("");
  const [guard, setGuard] = useState<string>("");
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [polygons, setPolygons] = useState<any[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string>("");
  const handleDateChange = (val: string) => {
    const num = Number(val);
    if (!val || isNaN(num)) {
      setDateError("Тоон утга оруулна уу");
      setDate("");
      return;
    }

    if (num < 1 || num > 28) {
      setDateError("1-28 хооронд байх ёстой");
    } else {
      setDateError("");
    }
    setDate(val);
  };

  const isStepOneValid =
    sohName.trim() !== "" &&
    propertyName.trim() !== "" &&
    polygons.length > 0 &&
    orshinSuugchdiinToo !== undefined &&
    !isNaN(orshinSuugchdiinToo);

  const isStepTwoValid =
    phoneNumber !== undefined &&
    !isNaN(phoneNumber) &&
    manager.trim() !== "" &&
    email.trim() !== "";

  const isStepThreeValid =
    cost !== undefined && !isNaN(cost) && date !== "" && dateError === "";

  const handleNextStep = (): void => {
    if (step === 1 && isStepOneValid) {
      setStep(2);
    } else if (step === 2 && isStepTwoValid) {
      setStep(3);
    } else if (step === 3 && isStepThreeValid) {
      setStep(4);
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle final Save
  const handleSave = async () => {
    if (!selectedFile) {
      console.error("Файл сонгогдоогүй байна");
      return;
    }

    try {
      // Create user first
      const { data: userData } = await registerUser({
        variables: {
          user: {
            username: sohName,
            phone: String(phoneNumber),
            email,
            firstname: manager?.split(" ")[0],
            lastname: manager?.split(" ")[1] || "",
            password: "1",
            role: "soh",
          },
        },
      });

      const ownerId = userData?.registerUser?._id;
      if (!ownerId) {
        console.error("User ID үүссэнгүй");
        return;
      }

      // Then create property
      await createProperty({
        variables: {
          property: {
            name: propertyName,
            ownerId: [ownerId],
            residentCount: orshinSuugchdiinToo,
            map: polygons,
            monthlyBill: cost,
            profilePic: selectedFile,
            monthlyBillDay: parseInt(date),
            cameraHub: "cameraHub",
            timeCheckArea: 0,
            baseLong: 0,
            baseLat: 0,
          },
        },
      });
      setShowToast(true);
      setToastStatus(true);
    } catch (error) {
      setToastStatus(false);
      setShowToast(true);

      console.error("Хадгалах үед алдаа гарлаа:", error);
    }
  };

  // const [donePolygon, setDonePolygon] = useState<any[]>();

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Input
              value={sohName}
              setValue={setSohName}
              placeHolder="СӨХ -ын нэр"
            />
            <Input
              value={propertyName}
              setValue={setPropertyName}
              placeHolder="Хотхоны нэр"
            />
            <button
              className="text-[14px] h-[54px] leading-[14px] text-white/80 text-start px-[16px] border border-white/50 py-[13px] rounded-[14px]"
              onClick={() => {
                // setStep(21);
                setNextPage(true);
              }}
            >
              {polygons.length !== 0 ? (
                <>
                  <div className="flex gap-2 text-white/50">
                    <span>{polygons[0]?.lat}</span>
                  </div>
                </>
              ) : (
                "Байршил"
              )}
            </button>
            {/* <Input
              value={location}
              setValue={setLocation}
              placeHolder="Байршил"
            /> */}
            <Input
              value={orshinSuugchdiinToo?.toString() ?? ""}
              setValue={(val: string) => setOrshinSuugchdiinToo(Number(val))}
              placeHolder="Оршин суугчдын тоо"
              type="number"
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              value={manager}
              setValue={setManager}
              placeHolder="Менежерийн нэр"
            />
            <Input
              value={phoneNumber}
              setValue={setPhoneNumber}
              placeHolder="Утасны дугаар"
              type="number"
            />
            <Input
              value={email}
              setValue={setEmail}
              placeHolder="Имэйл хаяг"
              type="email"
            />
          </>
        );
      case 3:
        return (
          <>
            <Input
              value={cost?.toString() ?? ""}
              setValue={(val: string) => setCost(Number(val))}
              placeHolder="Төлөх дүн"
              type="number"
            />

            <Input
              value={date}
              setValue={handleDateChange}
              placeHolder="Төлөх өдөр"
              type="number"
            />
            {dateError && (
              <div className="text-red-500 text-[12px] pl-[10px]">
                {dateError}
              </div>
            )}
          </>
        );
      case 4:
        return (
          <>
            {/* <Input
              value={guard}
              setValue={setGuard}
              placeHolder="Хамгаалагчийн нэр"
            /> */}
            {selectedFile ? (
              <div className="relative min-w-[272px] ">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected preview"
                  className=" w-full h-[154px] object-cover rounded"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                  className="absolute top-0 right-0 text-[12px] bg-red-500 rounded-sm text-white/80 hover:scale-110 duration-200"
                >
                  Зураг устгах
                </button>
              </div>
            ) : (
              <div className="relative min-w-[272px] flex flex-col gap-2 h-[154px] text-white/80 border border-dashed border-white/30 rounded">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  <ZuragInput />
                </div>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = (): boolean => {
    if (step === 1) return !isStepOneValid;
    if (step === 2) return !isStepTwoValid;
    if (step === 3) return !isStepThreeValid;
    return true;
  };

  return !nextPage ? (
    <>
      {showToast && (
        <Toast status={toastStatus} onClose={() => setShowToast(false)} />
      )}
      <div className="bg-black/15 rounded-[18px] h-[800px] relative">
        <header className="flex items-center bg-black/10 gap-[10px] h-[56px] rounded-t-[18px] px-[20px]">
          <PlusIcon opacity="0.5" />
          <div className="text-center text-white/90 text-[14px]">
            Объект нэмэх
          </div>
        </header>

        {/* Timeline */}
        <div className="flex items-center justify-between px-[30px] py-[24px]">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center w-full relative">
              <div
                className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[14px] font-medium z-10 text-white/80 ${
                  step >= item
                    ? "bg-[#80FFB766] text-black"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {item}
              </div>
              {item < 4 && (
                <div className="flex-1 h-[2px] bg-white/20 mx-[8px]" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <main className="py-[24px] px-[20px] flex flex-col gap-[10px]">
          {renderStepContent()}
        </main>

        {/* Button */}
        {step < 4 && (
          <footer className="absolute flex justify-center bottom-[20px] left-[50%] translate-x-[-50%]">
            <button
              onClick={handleNextStep}
              disabled={isNextDisabled()}
              className={`min-w-[175px] h-[42px] text-center rounded-[16px] text-[14px] transition-opacity ${
                !isNextDisabled()
                  ? "text-white bg-[#80FFB7] hover:opacity-90"
                  : "text-white/50 bg-white/15 cursor-not-allowed"
              }`}
            >
              Дараагийн алхам
            </button>
          </footer>
        )}
        {step === 4 && (
          <footer className="absolute flex justify-center bottom-[20px] left-[50%] translate-x-[-50%]">
            <button
              onClick={handleSave}
              className="min-w-[175px] h-[42px] text-center rounded-[16px] text-[14px] text-white bg-[#80FFB7] hover:opacity-90"
            >
              Хадгалах
            </button>
          </footer>
        )}
      </div>
    </>
  ) : (
    <Maps
      setDonePolygon={setNextPage}
      polygons={polygons}
      setPolygons={setPolygons}
      createPolygon={nextPage}
    />
  );
}
