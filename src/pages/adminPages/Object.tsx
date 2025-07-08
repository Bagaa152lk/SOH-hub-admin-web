import React, { useState } from "react";
import { ObjectType } from "../../type/type";
import HamgaalagchIcon from "../../assets/componentsSvg/adminsvg/hamgaalagchIcon";
import SearchIcon from "../../assets/componentsSvg/adminsvg/searchIcon";
import PlusIcon from "../../assets/componentsSvg/adminsvg/plusIcon";
import BaruunSum from "../../assets/componentsSvg/adminsvg/baruunSumIcon";
import TailanSumIcon from "../../assets/componentsSvg/adminsvg/tailanSumIcon";
import CamereTable from "../../components/CameraTable";
import ObjectPlusIcon from "../../assets/componentsSvg/adminsvg/objectPlusIcon";
import TableEmployeeUureg from "../../components/TableEmployeeUureg";
import SosAlert from "../../components/SosAlert";
import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";
import Xicon from "../../assets/componentsSvg/adminsvg/xIcon";
import OgogdsonUureg from "../../components/OgogdsonUureg";
import UuregList from "../../components/UuregList";
import Input from "../../components/layouts/Input";
import AddObjectSide from "../../components/AddObjectSide";

import { GET_PROPERTIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import HomeIcon from "../../assets/componentsSvg/adminsvg/homeIcon";
import EditIcon from "../../assets/componentsSvg/adminsvg/editIcon";
import Location from "../../assets/componentsSvg/adminsvg/location";
import UtasniIcon from "../../assets/componentsSvg/utasniIcon";
import ActiveGuard from "../../components/ActiveGuardList";

const tableHeaders = [
  "СӨХ НЭР",
  "ХОТХОНЫ НЭР",
  "МЕНЕЖЕР",
  "УТАСНЫ ДУГААР",
  "ИМЭЙЛ ХАЯГ",
  "УРТРАГ",
  "ӨРГӨРӨГ",

  "ОРШИН СУУГЧ",
  "ТӨЛӨХ ДҮН",
  "СТАТУС",
  "ХАМГААЛАГЧ",
];

export default function Object() {
  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
  });
  const [showAddObject, setShowAddObject] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>();
  const datas = data?.getProperties;

  return (
    <div className="grid grid-cols-10  gap-[20px] px-4">
      <div className="col-span-10  2xl:col-span-8 flex flex-col gap-[20px]">
        <div className="min-w-full h-[602px] overflow-hidden rounded-[18px] bg-black/10 flex flex-col gap-[20px]">
          <div className="min-w-full h-[56px] custom-background flex justify-between items-center px-[20px] py-[16px]">
            <div className="flex items-center gap-[6px]">
              <div>
                <HamgaalagchIcon />
              </div>
              <div className="text-white text-[12px] ">Нийт ОБЪЕКТ</div>
              <div className="px-[10px] py-[8px] h-[28px] flex justify-center items-center rounded-[18px] bg-[rgba(255,255,255,0.08)] text-[12px] text-white">
                {datas && datas.length}
              </div>
            </div>
            <div className="flex items-center gap-[16px]">
              <button>
                <SearchIcon />
              </button>
              <button onClick={() => setShowAddObject(true)}>
                <PlusIcon />
              </button>
            </div>
          </div>
          <div className="min-w-full px-[20px] flex flex-col gap-[10px]">
            <div className="min-w-full h-[44px]  grid grid-cols-11  bg-black/10 rounded-[14px] overflow-hidden px-[65px]">
              {tableHeaders.map((word, i) => (
                <div
                  key={i}
                  className={`flex justify-center items-center whitespace-nowrap gap-[4px] text-[12px] text-white font-[400] leading-[14px] `}
                >
                  <div className="custom-text-style">{word}</div>
                  <div>
                    <DooshooZaasanSum />
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full text-white flex flex-col gap-[10px] items-center justify-between ">
              {datas &&
                datas.map((item: any, i: number) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedProperty(item);
                    }}
                    className="h-[58px] w-full bg-white/10 overflow-x-auto flex items-center gap-4 rounded-[14px] px-[16px]"
                  >
                    <div className="min-w-[24px] h-[24px] bg-white/10 rounded-full flex items-center justify-center text-[10px] leading-[10px]">
                      {i + 1}
                    </div>
                    <div className="min-w-[32px] min-h-[32px] bg-[#00A870] rounded-full flex items-center justify-center text-white/80 text-[12px] font-bold">
                      {item.name.slice(0, 1)}
                    </div>
                    <span className="text-[14px] leading-[14px] whitespace-nowrap w-[91px] overflow-hidden text-ellipsis">
                      {item.name}
                    </span>
                    <span className="w-[100px] bg-white/10 rounded-[8px] text-[12px] leading-[12px] px-[14px] py-[8px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.name}
                    </span>
                    <span className="text-[14px] overflow-hidden text-ellipsis leading-[14px] whitespace-nowrap w-[100px] text-center">
                      {item.ownerId[0].firstname} {item.ownerId[0].lastname}
                    </span>
                    <span className="text-[14px] leading-[14px] whitespace-nowrap w-[140px] overflow-hidden text-ellipsis text-center">
                      {item.ownerId[0].phone}
                    </span>
                    <span className="text-[14px] leading-[14px] w-[140px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.ownerId[0].email}
                    </span>
                    <span className="text-[14px] leading-[14px] whitespace-nowrap w-[90px] overflow-hidden text-ellipsis">
                      {item.map[0].lat}
                    </span>
                    <span className="text-[14px] leading-[14px] whitespace-nowrap w-[90px] overflow-hidden text-ellipsis">
                      {item.map[0].long}
                    </span>
                    <span className="text-[14px] leading-[14px] whitespace-nowrap w-[110px] text-center">
                      {item.residentCount}
                    </span>
                    <span className="text-[14px] leading-[14px] whitespace-nowrap w-[100px] text-center overflow-hidden text-ellipsis">
                      {item.monthlyBill}
                    </span>
                    <span
                      className="px-[14px] py-[8px] rounded-[8px] flex items-center gap-[4px] whitespace-nowrap text-white/80 w-[140px]"
                      // style={{ backgroundColor: item.statusColor }}
                    >
                      <Xicon /> Тодорхойгүй
                    </span>
                    <div className="flex items-center   gap-[4px] w-[90px] overflow-auto">
                      {/* {item.avatars.map((src: any, idx: any) => (
                        <img
                          key={idx}
                          src={src}
                          className="min-w-[26px] h-[26px] rounded-full border border-[#80FFB766]"
                        />
                      ))} */}
                    </div>
                    <div className="min-w-[16px]">
                      <BaruunSum />
                    </div>
                  </div>
                ))}
            </div>

            {/* <div className="flex gap-[4px]">
              <div className="min-w-[36px] h-[36px] bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
                <TailanSumIcon />
              </div>
              <div className="min-w-[36px] h-[36px] bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
                1
              </div>
              <div className="min-w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
                2
              </div>
              <div className="min-w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
                3
              </div>
              <div className="min-w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
                ...
              </div>
              <div className="min-w-[36px] h-[36px] border border-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
                10
              </div>

              <div className="min-w-[36px] h-[36px] rotate-180 bg-white/15 flex justify-center items-center text-[14px] text-white/90 rounded-[10px]">
                <TailanSumIcon />
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[20px]">
          <CamereTable />
          <CamereTable />
          <CamereTable />
          <CamereTable />
        </div> */}
      </div>
      <div className="col-span-10 2xl:col-span-2">
        {showAddObject ? (
          <AddObjectSide />
        ) : selectedProperty ? (
          <div className="rounded-[18px] bg-black/10 overflow-hidden flex flex-col ">
            <div className="h-[56px] bg-black/10 text-white/80 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <HomeIcon />
                {selectedProperty?.name}
              </div>
              <EditIcon />
            </div>
            <div className="p-5 flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[10px]">
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location /> {selectedProperty.name}
                </div>
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <UtasniIcon /> {selectedProperty.name}
                </div>
                <div className="bg-white/10 px-[16px] text-[14px]  flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80 whitespace-nowrap text-ellipsis overflow-hidden">
                  <div>
                    <Location />
                  </div>{" "}
                  {selectedProperty.map[0].long} ,{selectedProperty.map[0].lat}
                </div>
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location />
                  {selectedProperty.residentCount} суугч
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/15"></div>
              <div className="flex flex-col gap-[10px]">
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location /> {selectedProperty.ownerId.firstname}
                  {selectedProperty.ownerId.lastname}
                </div>
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location /> {selectedProperty.ownerId.phone}
                </div>
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location /> {selectedProperty.ownerId.email}
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/15"></div>
              <div className="flex flex-col gap-[10px]">
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location /> {selectedProperty.monthlyBill}
                </div>
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location /> {selectedProperty.monthlyBillDate}
                </div>
                <div className="bg-white/10 px-[16px] text-[14px] flex items-center  rounded-[14px] gap-[10px] h-[44px] text-white/80">
                  <Location /> status
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/15"></div>
              <div className="border border-white/15 rounded-[14px] p-4 text-white/40 text-[14px] flex flex-col gap-4">
                Нийт хамгаалагч
                <div className="flex flex-col gap-[10px]">
                  <div className="rounded-[14px] bg-white/10 px-[16px]  py-[10px] text-white/80 leading-[14px] text-[14px] flex items-center gap-[10px]">
                    <div className="w-[30px] h-[30px]  rounded-full relative border border-[#80FFB7]">
                      <img
                        className="w-full h-full rounded-full"
                        src="/image/profile.png"
                        alt=""
                      />
                      <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#80FFB7] rounded-full" />
                    </div>
                    <p>Tumurbat Dorjpagva</p>
                  </div>
                  <div className="rounded-[14px] bg-white/10 px-[16px]  py-[10px] text-white/80 leading-[14px] text-[14px] flex items-center gap-[10px]">
                    <div className="w-[30px] h-[30px]  rounded-full relative border border-[#80FFB7]">
                      <img
                        className="w-full h-full rounded-full"
                        src="/image/profile.png"
                        alt=""
                      />
                      <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#80FFB7] rounded-full" />
                    </div>
                    <p>Tumurbat Dorjpagva</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-[#F6C32466] text-white/80 rounded-[16px] inline-flex items-center justify-center px-[32px] h-[44px] text-[14px]  ">
                  Тун удахгүй
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <div className="w-full h-[562px]">
              <SosAlert />
            </div>
            <div className="w-full h-[360px]">
              <OgogdsonUureg />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
