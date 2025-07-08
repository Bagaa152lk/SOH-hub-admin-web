import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ShieldnirunLogo from "../assets/componentsSvg/adminsvg/shield-nirun_Logo";
import {
  LayoutDashboard,
  ClipboardList,
  MessageCircle,
  AlertTriangle,
  Users,
  Menu,
  X,
  Cctv,
  Wrench,
  Receipt,
  FileText,
  Ban,
} from "lucide-react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user_id = localStorage.getItem("userId");
  const buttons = [
    {
      icon: <LayoutDashboard color="white" />,
      label: "Дашбоард",
      path: `/home-owner/${user_id}`,
    },
    {
      icon: <Users color="white" />,
      label: "Хамгаалагчид",
      path: `/home-owner/${user_id}/guards-table`,
    },
    {
      icon: <ClipboardList color="white" />,
      label: "Нийт үүрэг",
      path: `/home-owner/${user_id}/guard-task`,
    },
    {
      icon: <MessageCircle color="white" />,
      label: "Санал хүсэлт",
      path: `/home-owner/${user_id}/feedback`,
    },
    {
      icon: <AlertTriangle color="white" />,
      label: "SOS",
      path: `/home-owner/${user_id}/sos`,
    },
    {
      icon: <Ban color="white" />,
      label: "Зөрчилүүд , Зөвшөөрөл",
      path: `/home-owner/${user_id}/permission`,
    },
    {
      icon: <FileText color="white" />,
      label: "Өдрийн тайлан",
      path: `/home-owner/${user_id}/daily-report`,
    },
    {
      icon: <Receipt color="white" />,
      label: "Нэхэмжлэл",
      path: `/home-owner/${user_id}/invoice`,
    },
    {
      icon: <Wrench color="white" />,
      label: "Хэрэгсэл",
      path: `/home-owner/${user_id}/tools`,
    },
    {
      icon: <Cctv color="white" />,
      label: "Камер",
      path: `/home-owner/${user_id}/camera-table`,
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
