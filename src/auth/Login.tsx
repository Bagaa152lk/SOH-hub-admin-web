import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import ShieldnirunLogo from "../assets/componentsSvg/adminsvg/shield-nirun_Logo";
import Input from "../components/layouts/Input";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data } = await loginUser({
        variables: { phone, password },
      });
      const token = data?.loginUser;

      if (!token) {
        setErrorMessage("Таны мэдээлэл буруу байна.");
        return;
      }

      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } catch (err) {
      setErrorMessage("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
    }
  };
  useEffect(() => {
    if (phone.trim().length > 0 && password.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [phone, password]);

  if (loading) return <div>Түр хүлээнэ үү...</div>;
  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-[#3E4347] to-[#8c9195]">
      <div className="w-full lg:w-[40%] h-full relative  ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[312px] h-[555px] rounded-[18px] bg-white/10">
            <div className="text-[14px] text-white/90 bg-black/10 px-[20px] h-[56px] flex items-center rounded-t-[18px]">
              Системд нэвтрэх
            </div>
            <div className="pt-[48px] px-[20px] flex flex-col items-center gap-[48px]">
              <ShieldnirunLogo />
              <div className="flex w-full flex-col gap-[10px]">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-[54px] w-full rounded-[14px] bg-white/10 px-[20px] text-[14px] text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
                  placeholder="Хэрэглэгчийн нэр"
                  type="text"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[54px] w-full rounded-[14px] bg-white/10 px-[20px] text-[14px] text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
                  placeholder="Нууц үг"
                  type="password"
                />
                <p className="text-white/50 text-center text-[12px] mt-[20px]">
                  Нууц үгээ мартсан уу?{" "}
                  <a
                    className="text-white/70 text-[12px]"
                    href="/reset-password"
                  >
                    Сэргээх
                  </a>
                </p>
              </div>
              <button
                disabled={isDisabled}
                onClick={handleSubmit} // Trigger login on button click
                className={`w-full text-center rounded-[16px] h-[48px] text-[14px] 
    ${isDisabled ? "bg-white/5 text-white/30" : "bg-[#80FFB7] text-white"}`}
              >
                Цааш нэвтрэх
              </button>
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-400 text-[12px] mt-2 text-center">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      <div className="w-0 lg:w-[60%] ">
        <img
          src="/image/login-image.png"
          className="w-full h-full object-cover bg-center"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
