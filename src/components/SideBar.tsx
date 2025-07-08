import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ShieldnirunLogo from "../assets/componentsSvg/adminsvg/shield-nirun_Logo";
import {
  LayoutDashboard,
  Shield,
  ClipboardList,
  MessageCircle,
  AlertTriangle,
  Users,
  CalendarDays,
  Menu,
  X,
  CctvIcon,
} from "lucide-react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    {
      icon: <LayoutDashboard color="white" />,
      label: "Дашбоард",
      path: "/dashboard",
    },
    {
      icon: <ClipboardList color="white" />,
      label: "Нийт үүрэг",
      path: "/guard-task",
    },
    {
      icon: <Users color="white" />,
      label: "Нийт хамгаалагчид",
      path: "/all-guards",
    },
    {
      icon: <Shield color="white" />,
      label: "Нийт объект",
      path: "/object-table",
    },
    {
      icon: <MessageCircle color="white" />,
      label: "Нийт санал хүсэлт",
      path: "/feedback",
    },
    {
      icon: <AlertTriangle color="white" />,
      label: "Нийт SOS мэдэгдэл",
      path: "/sos",
    },
    {
      icon: <Shield color="white" />,
      label: "Нийт зөрчилүүд зөвшөөрөл",
      path: "/permission",
    },
    {
      icon: <CalendarDays color="white" />,
      label: "Нийт өдрийн тайлан",
      path: "/daily-report",
    },
    {
      icon: <CctvIcon color="white" />,
      label: "Нийт камер",
      path: "/camera-table",
    },
  ];

  return (
    <aside
      className={`h-full  text-white fixed left-[0] top-[0] flex flex-col   transition-all duration-300 ease-in-out ${
        isOpen
          ? "w-[250px] bg-white/10 backdrop-blur-lg"
          : "w-[52px] pt-[100px] ml-8 gap-[50px]"
      } z-[90000] `}
    >
      <div className="h-[60px] flex items-center justify-between px-4">
        {isOpen && (
          <span className="text-xl font-semibold pt-[20px]">
            <ShieldnirunLogo />
          </span>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav
        className={`flex flex-col px-2 py-6 space-y-2 ${
          isOpen ? "" : "gap-[10px]"
        }`}
      >
        {buttons.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-green-400 text-white"
                  : "text-white hover:bg-green-300 hover:text-white"
              }`
            }
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
