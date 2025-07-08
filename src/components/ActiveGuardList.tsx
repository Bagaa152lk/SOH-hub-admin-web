export default function ActiveGuard({
  name,
  checkedInTime,
  profilePic,
}: {
  name?: string;
  checkedInTime?: string;
  profilePic?: string;
}) {
  return (
    <div className="flex gap-[10px] border  bg-[#FFFFFF14] rounded-[14px] border-white/15 pt-[17px] pb-[16px] px-[20px] items-center">
      <div className="w-[38px] h-[38px] rounded-full border border-[#80FFB7] relative ">
        {" "}
        <img
          className="w-full h-full rounded-full"
          src={profilePic ? profilePic : "/image/profile.png"}
          alt=""
        />
        <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#80FFB7] rounded-full"></div>
      </div>{" "}
      <div>
        <div className="text-white/90 text-[14px]">{name}</div>
        <div className="text-white/50 text-[12px]">
          {checkedInTime && (
            <>
              <span>Ирсэн: </span>
              {new Date(parseInt(checkedInTime)).toLocaleString()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
