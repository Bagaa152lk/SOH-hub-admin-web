// src/components/AdminNavigation.tsx

import { useState, useEffect, useRef } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";

import ShieldnirunLogo from "../assets/componentsSvg/adminsvg/shield-nirun_Logo";
import HonhIcon from "../assets/componentsSvg/navigationIcons/HonhIcon";
import FireIcon from "../assets/componentsSvg/adminsvg/fireIcon";

import { messaging } from "../firebase";
import { onMessage } from "firebase/messaging";

import { requestPermission } from "../notifcation";
import { UPDATE_ME } from "../graphql/mutations";
import { GET_ALARMS, GET_MY_NOTIFICATIONS } from "../graphql/queries";
import { ChevronDown } from "lucide-react";
import { getIconAndLabelForAlarm } from "../helper/helper";

// import {} from "../firebase";
interface NotificationItem {
  title: string;
  body: string;
  receivedAt: string;
}

export default function AdminNavigation() {
  const [scrolling, setScrolling] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [updateMe] = useMutation(UPDATE_ME);
  const location = useLocation();
  const isAdmin = matchPath("/dashboard", location.pathname);
  const propertyId = localStorage.getItem("userId");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const { data: getMyNotif } = useQuery(GET_MY_NOTIFICATIONS);
  const { data: getAlarm } = useQuery(GET_ALARMS, {
    variables: {
      search: {},
      skip: 0,
      limit: 50,
    },
  });

  const notifDatas = getAlarm?.getAlarms;
  // FCM Token авалт ба listener

  useEffect(() => {
    const initNotifications = async () => {
      const token = await requestPermission();
      if (token) {
        await updateMe({
          variables: {
            fcmToken: token,
            topic: isAdmin ? "admin" : propertyId,
          },
        })
          .then((res: any) => {})
          .catch((err: any) => {
            console.error(err);
          });
      }
    };

    initNotifications();

    const unsubscribe = onMessage(messaging, (payload) => {
      const newNotif: NotificationItem = {
        title: payload.notification?.title || "No title",
        body: payload.notification?.body || "No body",
        receivedAt: new Date().toLocaleString(),
      };

      setNotifications((prev) => [newNotif, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  // Scroll blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Гадна даралт хийвэл dropdown хаагдах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLogoutDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className={`fixed w-full top-0 left-0 pl-[34px] pr-[34px] pt-[32px] pb-[24px] rounded-xl flex items-center justify-between z-[9999] ${
        scrolling
          ? "bg-white/5 backdrop-blur-[5px] duration-200"
          : "bg-transparent duration-200"
      }`}
    >
      <button onClick={() => navigate("/dashboard")}>
        <ShieldnirunLogo />
      </button>

      <div className="flex items-center gap-[10px]">
        {/* Honh (notification) */}
        <div className="relative">
          {/* 🔴 Badge харуулах */}
          {notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#f6c324] text-white text-xs rounded-full flex items-center justify-center z-[10]">
              {notifications.length > 9 ? "9+" : notifications.length}
            </div>
          )}

          <button
            onClick={() => setShowAlertModal(!showAlertModal)}
            className={`w-[50px] h-[50px] flex justify-center items-center duration-150 bg-[#ffffff14] hover:bg-[#ffffff60] rounded-full relative ${
              notifications.length > 0 ? "bg-" : null
            }`}
          >
            <HonhIcon color={notifications.length > 0 ? "#f6c324" : "white"} />
          </button>

          {/* Popup notification list */}
          {showAlertModal && (
            <div className="absolute p-[20px] flex flex-col gap-[10px] w-[312px] max-h-[700px] bg-white/10 backdrop-blur-[156px] top-[70px] -right-[90px] md:right-0 rounded-[18px] overflow-hidden overflow-y-auto z-50">
              <h2 className="text-white text-lg font-semibold">
                ⚡ Шинэ мэдэгдэлүүд
              </h2>
              {notifications.length === 0 ? (
                <p className="text-white/70">Одоогоор мэдэгдэл алга байна.</p>
              ) : (
                <>
                  {notifications.map((notif, index) => {
                    const { label, icon } = getIconAndLabelForAlarm(
                      notif.title
                    );
                    return (
                      <div
                        key={index}
                        className="flex items-center bg-[#F6C32414] border border-[#F6C32466] min-h-[58px] pr-[18px] pl-[17px] rounded-[14px] overflow-hidden"
                      >
                        <div className="flex items-center gap-[11px]">
                          {icon}
                          <div className="flex flex-col gap-2">
                            <span className="text-[14px] text-white/90 leading-[14px]">
                              {label}
                            </span>
                            <div className="text-[12px] text-white/50 leading-[14px]">
                              {notif.body} – {notif.receivedAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
              <span className="text-white/80 font-black text-[20px] text-center">
                Түүх
              </span>
              {notifDatas &&
                notifDatas.map((notif: any, index: number) => {
                  const { icon, label } = getIconAndLabelForAlarm(
                    notif.alarmStr
                  );

                  return (
                    <div key={index}>
                      <div className="cursor-pointer flex items-center justify-between bg-[#F6C32414] border border-[#F6C32466] min-h-[58px] pr-[18px] pl-[17px] py-3 rounded-[14px] overflow-hidden">
                        <div className="flex items-start gap-[11px]">
                          {icon}
                          <div className="flex flex-col gap-2">
                            <span className="text-[14px] text-white/90 leading-[14px]">
                              {label} {/* Харуулж буй орчуулсан нэр */}
                            </span>
                            <div className="text-[12px] text-white/50 leading-[14px]">
                              {notif.chId} –
                              {new Date(parseInt(notif.time)).toLocaleString(
                                "mn-MN"
                              )}
                            </div>
                            <div>
                              <div className="inline rounded-[8px] h-[30px] px-[10px] py-[8px] bg-white/10 text-[12px] text-white/80 leading-[12px]">
                                {/* {notif?.propertyId?.name} */}
                                Кристал товн
                              </div>
                            </div>
                          </div>
                        </div>
                        <span
                          onClick={() => toggleExpand(index)}
                          className="text-white/70 text-[20px]"
                        >
                          <ChevronDown
                            className={`duration-200 hover:scale-110 hover:text-green-300 ${
                              expandedIndex !== index
                                ? "rotate-0"
                                : "rotate-180 text-green-300"
                            }`}
                          />
                        </span>
                      </div>

                      {expandedIndex === index && notif.img_str_s && (
                        <div className="mt-2 px-4">
                          <img
                            src={notif.img_str_s}
                            alt="Notification"
                            className="rounded-lg max-h-[300px] w-auto object-contain border border-white/20"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Profile + Logout */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-[50px] h-[50px] rounded-full overflow-hidden bg-white/50 cursor-pointer"
            onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
          >
            <img
              src="/image/profile.png"
              className="w-[50px] h-[50px] rounded-full"
              alt="profile"
            />
          </div>

          {showLogoutDropdown && (
            <div className="absolute top-[60px] right-0 bg-[#ffffff0f] backdrop-blur-[10px] border border-white/10 text-white rounded-[10px] py-[10px] w-[150px] shadow-md z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-[15px] py-[8px] hover:bg-white/10"
              >
                Гарах
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
