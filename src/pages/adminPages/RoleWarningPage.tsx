export default function RoleWarningPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-[46px] font-[600]">Та СӨХ-ийн вэбээр хандана уу</h1>
      <a
        onClick={() => localStorage.clear()}
        className="text-[36px] text-blue-400 font-[500] hover:cursor-pointer"
        href="https://property.shieldnirun.io/login"
      >
        СӨХ-ийн вэб
      </a>
      <p className="text-[36px] font-[600]">дээр дарж үсэрнэ үү</p>
    </div>
  );
}
