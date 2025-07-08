"use client";
import React, { useState } from "react";
import AddSohInputComponent from "../../components/AddSohInputComponent";
import { CREATE_PROPERTY, REGISTER_USER } from "../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { LIST_USERS } from "../../graphql/queries";
import Maps from "../../components/Maps";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/componentsSvg/adminsvg/homeIcon";
import BaruunsumBultsgar from "../../assets/componentsSvg/adminsvg/baruunsumBultsgar";
import CorrectIcon from "../../assets/componentsSvg/adminsvg/correctIcon";

const CreateNewHothon: React.FC = () => {
  const navigate = useNavigate();
  const [createProperty] = useMutation(CREATE_PROPERTY);
  const [registerUser] = useMutation(REGISTER_USER);
  const [polygons, setPolygons] = useState<any[]>([]);
  const [sohName, setSohName] = useState("");
  const [hothonName, setHothonName] = useState("");
  const [orshinSuugchdinToo, setOrshinSuugchdinToo] = useState("");
  const [tulbur, setTulbur] = useState("");
  const [tulburTuluhUdur, setTulburTuluhUdur] = useState("");
  const [menejriinOvogNer, setMenejriinOvogNer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searchGuard, setSearchGuard] = useState("");
  const [selectedGuards, setSelectedGuards] = useState<any[]>([]);
  const [nemeltTailbar, setNemeltTailbar] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const { loading, error, data } = useQuery(LIST_USERS, {
    variables: { role: "guard" },
    fetchPolicy: "cache-and-network",
  });

  const filteredGuards =
    data?.listUsers.filter((user: any) =>
      `${user.firstname} ${user.lastname}`
        .toLowerCase()
        .includes(searchGuard.toLowerCase())
    ) || [];

  const toggleSelectGuard = (guard: any) => {
    const exists = selectedGuards.find((g) => g._id === guard._id);
    if (exists) {
      setSelectedGuards((prev) => prev.filter((g) => g._id !== guard._id));
    } else {
      setSelectedGuards((prev) => [...prev, guard]);
    }
  };
  const clearFunction = () => {
    setEmail("");
    setHothonName("");
    setMenejriinOvogNer("");
    setNemeltTailbar("");
    setOrshinSuugchdinToo("");
    setPhoneNumber("");
    setSohName("");
    setTulbur("");
    setTulburTuluhUdur("");
    setSearchGuard("");
    setSelectedGuards([]);
  };
  const handleCreateProperty = async () => {
    try {
      const userdataSent = {
        username: sohName,
        phone: phoneNumber,
        email,
        firstname: menejriinOvogNer.split(" ")[0],
        lastname: menejriinOvogNer.split(" ")[1] || "",
        password: "12341234",
        role: "soh",
      };

      const { data: userData } = await registerUser({
        variables: { user: userdataSent },
      });

      const propertyData = {
        name: hothonName,
        desc: nemeltTailbar,
        ownerId: userData?.registerUser?._id,
        cameraHub: "camera-hub",
        timeCheckArea: 0,
        baseLong: 0.0,
        baseLat: 0.0,
        map: polygons,
      };

      const { data: propertyResponse } = await createProperty({
        variables: { property: propertyData },
      });

      clearFunction();
    } catch (err) {
      console.error("Error:", err);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };
  if (loading) return <div>Түр хүлээнэ үү...</div>;
  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  return (
    <div className="w-full min-h-[100%] py-[50px] flex justify-center items-center">
      {!nextPage ? (
        <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[64%] bg-white/10 rounded-[18px]  top-[80px] overflow-hidden">
          <div className="w-full h-[56px] bg-black/10 px-[18px] flex items-center gap-[8px]">
            <HomeIcon />
            <div className="text-white/90 text-[14px]">СӨХ нэмэх</div>
          </div>

          {/* INPUTS */}
          <div className="p-[20px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[16px]">
            <AddSohInputComponent
              sohValue={sohName}
              setSohValue={setSohName}
              placeholder="СӨХ -нэр"
              type="text"
            />
            <AddSohInputComponent
              sohValue={hothonName}
              setSohValue={setHothonName}
              placeholder="Хотхоны нэр"
              type="text"
            />
            <AddSohInputComponent
              sohValue={orshinSuugchdinToo}
              setSohValue={setOrshinSuugchdinToo}
              placeholder="Оршин суугчдын тоо"
              type="number"
            />
            <button
              onClick={() => {
                setNextPage(true);
              }}
              className="h-[54px] flex   justify-between items-center bg-white/10 focus:ring-[1px] ring-[#80ffb7] rounded-[14px] focus:outline-none text-white/70 text-[14px] leading-[14px] px-[16px]  hover:ring-1 hover:ring-[#80FFB7] hover:scale-95 duration-150"
            >
              <p> Байршил сонгох</p> <BaruunsumBultsgar />
            </button>
            {/* <div className="grid grid-cols-2 gap-[16px] col-span-3">
              <AddSohInputComponent
                sohValue={urtrag}
                setSohValue={setUrtrag}
                placeholder="Уртраг"
                type="text"
              />
              <AddSohInputComponent
                sohValue={orgorog}
                setSohValue={setOrgorog}
                placeholder="Өргөрөг"
                type="text"
              />
            </div> */}
            <AddSohInputComponent
              sohValue={tulbur}
              setSohValue={setTulbur}
              placeholder="Төлбөрийн дүн"
              type="number"
            />
            <AddSohInputComponent
              sohValue={tulburTuluhUdur}
              setSohValue={setTulburTuluhUdur}
              placeholder="Төлбөр төлөх өдөр"
              type="number"
            />
            <AddSohInputComponent
              sohValue={menejriinOvogNer}
              setSohValue={setMenejriinOvogNer}
              placeholder="Менежерийн овог нэр"
              type="text"
            />
            <AddSohInputComponent
              sohValue={phoneNumber}
              setSohValue={setPhoneNumber}
              placeholder="Утасны дугаар"
              type="number"
            />
            <AddSohInputComponent
              sohValue={email}
              setSohValue={setEmail}
              placeholder="Имэйл"
              type="text"
            />
          </div>

          {/* SEARCH GUARD */}
          <div className="px-[20px]">
            <AddSohInputComponent
              sohValue={searchGuard}
              setSohValue={setSearchGuard}
              placeholder="Аюулгүй байдлын ажилтан нэмэх"
              type="text"
              className="w-full"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {filteredGuards.map((guard: any) => {
                const isSelected = selectedGuards.find(
                  (g) => g._id === guard._id
                );
                return (
                  <button
                    key={guard._id}
                    onClick={() => toggleSelectGuard(guard)}
                    className={`px-[10px] h-[50px]  flex justify-between items-center  text-[12px] border border-white/15 bg-white/10 text-white/90 rounded-[14px] gap-[20px] hover:ring-1 hover:ring-[#80FFB7] hover:scale-95 duration-150`}
                  >
                    <img
                      className="w-[30px] h-[30px] rounded-full bg-white/15"
                      src={guard.img_url ? guard.img_url : "/image/profile.png"}
                      alt=""
                    />
                    <span className="">
                      {guard.lastname} {guard.firstname}
                    </span>
                    <CorrectIcon
                      color={isSelected! ? "#80FFB7" : "#ffffff44"}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="p-[20px]">
            <AddSohInputComponent
              sohValue={nemeltTailbar}
              setSohValue={setNemeltTailbar}
              placeholder="Нэмэлт тайлбар"
              type="text"
              className="w-full"
            />
          </div>

          {/* BUTTONS */}
          <div className="px-[20px] mb-[20px] flex flex-wrap items-center gap-[16px]">
            <button
              onClick={() => {
                handleCreateProperty();
              }}
              className="bg-[#80ffb7] h-[48px] px-[32px] rounded-[16px] text-white/90 hover:ring-1 hover:ring-[#80FFB7] hover:scale-95 duration-150"
            >
              Шинээр нэмэх
            </button>
            <button
              className="bg-[#F6C32466] h-[48px] px-[32px] rounded-[16px] text-white/90 hover:ring-1 hover:ring-[#80FFB7] hover:scale-95 duration-150"
              onClick={() => {
                clearFunction();
                navigate("/select-hothon");
              }}
            >
              Цуцлах
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[95%]  h-[80vh]">
          <Maps
            setDonePolygon={setNextPage}
            polygons={polygons}
            setPolygons={setPolygons}
            createPolygon={nextPage}
          />
        </div>
      )}
    </div>
  );
};

export default CreateNewHothon;
