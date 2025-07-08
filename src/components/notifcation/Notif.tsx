// Notif.tsx
import { useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../firebase";
import SosList from "../SosList";
import FireIcon from "../../assets/componentsSvg/adminsvg/fireIcon";

interface NotificationItem {
  title: string;
  body: string;
  receivedAt: string;
}

export default function Notif() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {

      const newNotif: NotificationItem = {
        title: payload.notification?.title || "No title",
        body: payload.notification?.body || "No body",
        receivedAt: new Date().toLocaleString(),
      };

      setNotifications((prev) => [newNotif, ...prev]);
    });

    return () => {
      // Энэ нь memory leak-ээс сэргийлнэ
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white text-lg font-semibold">⚡ Шинэ мэдэгдэлүүд</h2>
      {/* <SosList /> */}
      {notifications.length === 0 ? (
        <p className="text-white/70">Одоогоор мэдэгдэл алга байна.</p>
      ) : (
        notifications.map((notif, index) => (
          <div className="flex items-center bg-[#F6C32414] border-[1px] border-[#F6C32466] min-h-[58px] bg-[#585c60]  pr-[18px] pl-[17px] rounded-[14px]">
            <div className="flex items-center gap-[11px]">
              <FireIcon />
              <div className="flex flex-col gap-2 ">
                <span className="text-[14px] text-start leading-[14px] text-white/90">
                  {notif.title}
                </span>
                <div className="text-[12px] text-white/50 leading-[14px] flex flex-col gap-[10px] items-start">
                  <span>
                    {notif.body} {notif.receivedAt}
                  </span>
                  {/* <div className="flex justify-center items-center rounded-[8px] h-[30px] px-[10px] py-[8px] bg-white/10 text-[12px] leading-[12px]">
                    Gerluge Home
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
