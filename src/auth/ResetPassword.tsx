import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CHECK_OTP, FORGOT_PASSWORD } from "../graphql/mutations";

export default function ResetPass() {
  const [phone, setPhone] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [forgotPass, { loading }] = useMutation(FORGOT_PASSWORD);
  const [checkPassOtp, { loading: CheckOTP }] = useMutation(CHECK_OTP);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data } = await forgotPass({
        variables: { phoneNumber: phone },
      });
      const responseStatus = JSON.parse(data.forgotPassword);

      if (responseStatus.status == "0") {
        setErrorMessage(`${responseStatus.message}`);
      } else if (responseStatus.status == "1") {
        setShowOtp(true);
      }
    } catch (err) {
      setErrorMessage("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    const nextInput = document.getElementById(`code-input-${index + 1}`);
    if (value && nextInput) nextInput.focus();
  };

  const handleOtpSubmit = () => {
    const otpCode = code.join("");

    if (otpCode.length === 4) {
      setShowPass(true);
      setShowOtp(false);
    } else {
      setErrorMessage("Та бүх оронтой нууц кодоо оруулна уу.");
    }
  };

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Нууц үг таарахгүй байна.");
      return;
    }

    const otpCode = code.join("");
    try {
      const { data } = await checkPassOtp({
        variables: { otpInput: { code: otpCode, newPassword: newPassword } },
      });

      navigate("/login");
    } catch (err) {
      setErrorMessage("Нууц үг шинэчлэх явцад алдаа гарлаа.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-[#3E4347] to-[#8c9195]">
      <div className="w-full lg:w-[40%] h-full relative  ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Step 1: Phone Number Input */}
          {!showOtp && !showPass ? (
            <div className="w-[312px] h-[555px] rounded-[18px] bg-white/10">
              <div className="text-[14px] text-white/90 bg-black/10 px-[20px] h-[56px] flex items-center rounded-t-[18px]">
                Нууц үг сэргээх
              </div>
              <div className="pt-[48px] px-[20px] flex flex-col items-center gap-[48px]">
                <div className="flex w-full flex-col gap-[10px] items-center">
                  <p className="text-white/50 text-center text-[12px] w-[70%]">
                    Та өөрийн бүртгэлтэй утасны дугаараа оруулна уу?
                  </p>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-[54px] w-full rounded-[14px] bg-white/10 px-[20px] text-[14px] text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
                    placeholder="Утасны дугаар"
                    type="text"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full text-center rounded-[16px] bg-white/5 h-[48px] text-[14px] text-white/30"
                  disabled={loading}
                >
                  {loading ? "Нууц код авах..." : "Нууц код авах"}
                </button>
                {errorMessage && (
                  <div className="error-message text-center text-[14px] text-red-500">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Step 2: OTP Input */}
          {showOtp && !showPass ? (
            <div className="w-[312px] h-[555px] rounded-[18px] bg-white/10">
              <div className="text-[14px] text-white/90 bg-black/10 px-[20px] h-[56px] flex items-center rounded-t-[18px]">
                Нууц үг сэргээх
              </div>
              <div className="pt-[48px] px-[20px] flex flex-col items-center gap-[48px]">
                <div className="flex w-full flex-col gap-[10px] items-center">
                  <p className="text-white/50 text-center text-[12px] w-[70%]">
                    Таны {phone} бүртгэлтэй утасны дугаарт нууц код илгээлээ.
                  </p>
                  <div className="grid grid-cols-4 gap-[10px]">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-input-${index}`}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        className="h-[54px] text-center w-full rounded-[14px] bg-white/10 px-[10px] text-[24px] text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
                        placeholder=""
                        type="text"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleOtpSubmit}
                  className="w-full text-center rounded-[16px] bg-white/5 h-[48px] text-[14px] text-white/30"
                >
                  Баталгаажуулах
                </button>
                {errorMessage && (
                  <div className="error-message text-center text-[14px] text-red-500">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Step 3: New Password Input */}
          {showPass && (
            <div className="w-[312px] h-[555px] rounded-[18px] bg-white/10">
              <div className="text-[14px] text-white/90 bg-black/10 px-[20px] h-[56px] flex items-center rounded-t-[18px]">
                Нууц үг сэргээх
              </div>
              <div className="pt-[48px] px-[20px] flex flex-col items-center gap-[48px]">
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-[54px] w-full rounded-[14px] bg-white/10 px-[20px] text-[14px] text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
                  placeholder="Шинэ нууц үг"
                  type="password"
                />
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-[54px] w-full rounded-[14px] bg-white/10 px-[20px] text-[14px] text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
                  placeholder="Нууц үгийг баталгаажуулах"
                  type="password"
                />
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full text-center rounded-[16px] bg-white/5 h-[48px] text-[14px] text-white/30"
                >
                  Нууц үг шинэчлэх
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-0 lg:w-[60%] h-full">
        <img
          src="/image/login-image.png"
          className="w-full h-full object-cover bg-center"
          alt="Login"
        />
      </div>
    </div>
  );
}
