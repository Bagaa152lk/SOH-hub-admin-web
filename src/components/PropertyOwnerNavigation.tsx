import { useState, useEffect } from "react";

import SosList from "./SosList";
import { useNavigate, useParams } from "react-router-dom";
import ShieldnirunLogo from "../assets/componentsSvg/adminsvg/shield-nirun_Logo";
import HonhIcon from "../assets/componentsSvg/navigationIcons/HonhIcon";
import SideMenuIcon from "../assets/componentsSvg/navigationIcons/sideMenuIcon";
import { useAtom } from "jotai";
import { showSideBarAtom } from "../hook/showSideBar";
import { GET_PROPERTIES, GET_PROPERTY_ID } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import BaruunsumBultsgar from "../assets/componentsSvg/adminsvg/baruunsumBultsgar";
import ProfileDropdownButton from "./navigation/profileDropdown";
import { getTime } from "react-datepicker/dist/date_utils";

function PropertyOwnerNavigation() {
  const id = localStorage.getItem("userId");

  // const [showSideBar, setShowSideBar] = useAtom(showSideBarAtom);
  const [scrolling, setScrolling] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PROPERTY_ID, {
    variables: { _id: id },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed w-full  top-0 left-0  pl-[34px] pr-[34px] pt-[32px] pb-[24px] rounded-xl flex items-center justify-between z-[9999] ${
          scrolling
            ? "bg-white/5 backdrop-blur-[5px] duration-200"
            : "bg-transparent duration-200"
        }`}
      >
        <button
          onClick={() => {
            navigate("/dashboard");
            localStorage.removeItem("userId");
          }}
        >
          <ShieldnirunLogo />
        </button>
        <div className="flex  items-center gap-[10px]">
          <button
            // onClick={() => {
            //   setShowSideBar(!showSideBar);
            // }}
            className="flex w-[50px]"
          ></button>
          <button
            onClick={() => {
              setShowAlertModal(!showAlertModal);
            }}
            className="w-[50px] h-[50px] flex justify-center items-center bg-[#ffffff14] rounded-full relative"
          >
            <HonhIcon />
            {showAlertModal && (
              <div className="absolute p-[20px] flex flex-col gap-[10px] w-[312px] h-[700px] bg-white/10 backdrop-blur-[156px] top-[70px] -right-[90px]  md:right-0 rounded-[18px] overflow-hidden overflow-y-auto">
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
                <SosList />
              </div>
            )}
          </button>
          <ProfileDropdownButton name={data?.getProperty.name} />
        </div>
      </div>
    </>
  );
}

export default PropertyOwnerNavigation;
