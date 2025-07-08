import { useState } from "react";

interface InputProps<T = string> {
  value?: T;
  setValue?: (value: T) => void;
  placeHolder?: string;
  type?: string;
  className?: string;
}

export default function Input<T = string>({
  value,
  setValue,
  placeHolder,
  type = "text",
  className,
}: InputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);

  // Input дээр анхаарал (focus) байгаа эсвэл утгатай бол label дээшээ гарах
  const isFloating = isFocused || (!!value && value !== "");

  return (
    <div
      className={`relative w-full h-[54px] bg-white/10 rounded-[14px] ${className}`}
    >
      <label
        className={`absolute left-[16px] transition-all duration-200 text-white/40 pointer-events-none
          ${isFloating ? "top-[6px] text-[10px]" : "top-[18px] text-[12px]"}
        `}
      >
        {placeHolder}
      </label>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          const val = e.target.value;
          if (setValue) {
            setValue(type === "number" ? (Number(val) as any) : (val as any));
          }
        }}
        value={value as any}
        className="w-full h-full text-[14px] px-[16px] pt-[20px] bg-transparent text-white/90 outline-none"
        type={type}
      />
    </div>
  );
}
