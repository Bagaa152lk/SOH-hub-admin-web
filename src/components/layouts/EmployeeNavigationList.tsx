interface EmployeeWorkingListType {
  date?: string;
  weekly?: string;
  checkedinTime?: string;
  checkedOutTime?: string;
  lateTime?: string;
}
function EmployeeNavigationList({
  date,
  weekly,
  checkedinTime,
  checkedOutTime,
  lateTime,
}: EmployeeWorkingListType) {
  return (
    <div className="px-[16px] w-full h-[48px]  grid grid-cols-4 rounded-[14px] bg-[#FFFFFF14] items-center border border-[#FFFFFF14]">
      <div className="flex flex-col gap-[4px]">
        <div className="text-white/90 text-[12px] leading-[12px] font-[400]">
          -
        </div>
        <div className="flex items-center gap-[4px]">
          <span className="min-w-[6px] min-h-[1px] bg-[#80FFB7]"></span>
          <span className="text-white/50 text-[10px] leading-[12px] font-[400]">
            -{" "}
          </span>
        </div>
      </div>
      <div className="text-[12px] font-[400] ml-[18px] text-white/90">- </div>
      <div className="text-[12px] font-[400] ml-[18px] text-white/90">- </div>
      <div className="text-[12px] font-[400] ml-[18px] text-white/90">- </div>
    </div>
  );
}
export default EmployeeNavigationList;
