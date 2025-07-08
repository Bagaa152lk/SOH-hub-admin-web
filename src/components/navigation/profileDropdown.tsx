import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileDropdownButton({ name }: { name?: string }) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility
  const navigate = useNavigate();
  // const [selectedItem, setSelectedItem] = useState(name); // Default selected item

  // List of items for the dropdown
  // const items = ["hellomock", "Кристал Товн", "Нарний хороолол"];

  // const handleSelectItem = (item: any) => {
  //   setSelectedItem(item); // Set the selected item
  //   setIsOpen(false); // Close the dropdown
  // };

  return (
    <div className="relative">
      <button
        className="h-[50px] w-[90px] sm:w-[191px] bg-white/10 rounded-tl-[55px] rounded-bl-[55px] rounded-tr-[16px] rounded-br-[16px] pl-[2px] pr-[16px] flex justify-between"
        onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown
      >
        <div className="flex items-center">
          <div className="bg-[#00A870] w-[46px] h-[46px] rounded-full flex justify-center items-center font-[600] text-[16px] text-white/90">
            {name?.slice(0, 1)}
          </div>
          <p className="hidden sm:flex text-[14px] font-[400] leading-[14px] text-white/50 ml-[8px] overflow-hidden whitespace-nowrap overflow-ellipsis">
            {name}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-3.93402e-07 9C-5.1533e-07 6.21063 0.786576 3.93733 2.36193 2.36187C3.93728 0.786533 6.21063 -2.71475e-07 9 -3.93402e-07C11.7894 -5.1533e-07 14.0627 0.786533 15.6381 2.36187C17.2135 3.93733 18 6.21063 18 9C18 11.7894 17.2135 14.0627 15.6381 15.6381C14.0627 17.2134 11.7894 18 9 18C6.21063 18 3.93728 17.2134 2.36193 15.6381C0.786576 14.0627 -2.71475e-07 11.7894 -3.93402e-07 9ZM10.0847 12.7248C9.44608 13.2211 8.55392 13.2211 7.91532 12.7248C6.15599 11.3575 5.26215 9.49853 4.61113 7.61504C4.46333 7.18745 4.62869 6.78413 4.88547 6.54648C5.13899 6.31185 5.53729 6.18329 5.93911 6.32836C6.65015 6.58507 7.80601 6.91667 9 6.91667C10.194 6.91667 11.3499 6.58507 12.0609 6.32836C12.4627 6.18329 12.861 6.31185 13.1145 6.54648C13.3713 6.78412 13.5367 7.18745 13.3889 7.61504C12.7378 9.49853 11.844 11.3575 10.0847 12.7248Z"
              fill="white"
              fillOpacity="0.4"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <ul className="absolute mt-2 -left-[100px] sm:left-0 w-[191px] bg-white rounded-b-lg shadow-lg z-10">
          <li
            onClick={() => {
              localStorage.removeItem("userId");
              navigate("/");
            }}
            className="px-4 py-2 text-sm bg-gray-500 text-white/80 cursor-pointer hover:bg-gray-100"
          >
            Үндсэн админ
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileDropdownButton;
