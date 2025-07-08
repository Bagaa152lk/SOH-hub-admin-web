import { useEffect } from "react";
import CorrectIcon from "../../assets/componentsSvg/adminsvg/correctIcon";
import Xicon from "../../assets/componentsSvg/adminsvg/xIcon";

interface ToastProps {
  onClose?: () => void;
  duration?: number;
  status?: boolean;
}

const Toast = ({ onClose, status, duration = 2000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose(); // Toast автоматаар алга болно
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-[34px] right-[284px]  text-white text-[14px] leading-[14px] flex items-center gap-[10px] px-[18px] py-[16px] rounded-[16px]  shadow-lg animate-slide-in ${
        status === true
          ? "bg-[#80FFB714] border border-[#80FFB766]"
          : "bg-[#F6C32414] border border-[#F6C32466]"
      }`}
    >
      {status === true ? (
        <>
          <CorrectIcon width="18px" height="18px" /> Амжилттай хадгаллаа.
        </>
      ) : (
        <>
          <Xicon width="18px" height="18px" /> Хадгалахад асуудал үүслээ.
        </>
      )}
    </div>
  );
};

export default Toast;
