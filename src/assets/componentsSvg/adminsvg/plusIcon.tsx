import { IconColorType } from "../../../type/type";
function PlusIcon({ color, width, height, opacity }: IconColorType) {
  return (
    <svg
      className="hover:scale-110 cursor-pointer"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="text-white hover:text-[#80FFB7CC]  duration-200 opacity-50 hover:opacity-100"
        width="20"
        height="20"
        rx="10"
        fill="currentColor"
        fillOpacity=""
      />
      <rect x="6" y="9" width="8" height="2" rx="1" fill="#64696C" />
      <rect
        x="11"
        y="6"
        width="8"
        height="2"
        rx="1"
        transform="rotate(90 11 6)"
        fill="#64696C"
      />
    </svg>
  );
}
export default PlusIcon;
