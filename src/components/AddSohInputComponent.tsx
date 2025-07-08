import { ChangeEvent } from "react";

interface AddSohInputComponentProps {
  sohValue: string;
  setSohValue: (value: string) => void;
  placeholder: string;
  type: string;
  className?: string;
}

export default function AddSohInputComponent({
  sohValue,
  setSohValue,
  placeholder,
  type,
  className,
}: AddSohInputComponentProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSohValue(e.target.value);
  };

  return (
    <input
      onChange={handleChange}
      value={sohValue}
      placeholder={placeholder}
      className={`h-[54px] bg-white/10 focus:ring-[1px] ring-[#80ffb7] rounded-[14px] focus:outline-none text-[#80FFB7] text-[14px] leading-[14px] px-[16px] input-no-spinner hover:ring-1 hover:ring-[#80FFB7] duration-150 hover:scale-[98%] ${className}`}
      type={type}
    />
  );
}
