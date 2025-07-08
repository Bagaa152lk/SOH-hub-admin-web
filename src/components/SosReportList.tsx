import BaruunSum from "../assets/componentsSvg/adminsvg/baruunSumIcon";

function SosReportList({ data, number, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className=" w-full px-[16px] py-[8px]  rounded-[14px] bg-white/10 h-[58px] flex items-center gap-[70px] hover:scale-[98%] duration-200 hover:ring-[1px] ring-[#80FFB7]  cursor-pointer"
    >
      <div className="min-w-[1340px] flex items-center gap-[40px] overflow-auto relative">
        <div className="flex items-center gap-[10px]">
          <span className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[10px] leading-[10px] text-white/80 font-[500] bg-white/10">
            {number}
          </span>
          <span className="min-w-8 h-8 ml-[6px] bg-[#00A870] rounded-full flex items-center justify-center font-[600] text-white/80 ">
            {data.propertyId.name.slice(0, 1)}
          </span>
          <span className="text-white/90 text-[12px] leading-[12px] text-center w-[91px] ">
            {data.propertyId.name}
          </span>
        </div>
        <span className="px-[14px] py-2 flex w-[120px] items-center gap-[6px] text-white/80 border border-[#F6C324CC] rounded-[8px] text-[12px] leading-[12px] bg-[#F6C32429]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.136174 1.03864C-0.0823347 0.758732 -0.0325648 0.354687 0.247339 0.136175C0.527243 -0.0823352 0.931287 -0.032565 1.1498 0.24734C1.84509 1.13799 2.47901 1.9301 3.08184 2.6544C3.17996 2.05358 3.46407 1.49404 3.90009 1.05801C4.44849 0.509614 5.19227 0.201527 5.96781 0.201527C6.74337 0.201527 7.48715 0.509614 8.03554 1.05801C8.58392 1.60641 8.89202 2.35019 8.89202 3.12575V4.01557C9.89889 4.40063 10.6552 5.32397 10.7817 6.43999C10.8314 6.87901 10.8668 7.33219 10.8668 7.79527C10.8668 8.25835 10.8314 8.71152 10.7817 9.15053C10.7512 9.41946 10.6841 9.67733 10.5857 9.91899C10.957 10.2186 11.3461 10.5289 11.7558 10.8527C12.0343 11.0729 12.0816 11.4773 11.8614 11.7558C11.6412 12.0344 11.2368 12.0817 10.9583 11.8615C5.98252 7.92782 3.94413 5.91654 0.136174 1.03864ZM1.84808 4.85782C1.86012 4.84457 1.87223 4.83142 1.88441 4.81838C4.06856 7.38217 5.95061 9.15482 8.96052 11.5912C8.8435 11.6282 8.71894 11.6562 8.58666 11.6732C8.38207 11.7267 8.1694 11.7586 7.95157 11.7663C7.31803 11.7889 6.66787 11.8005 5.96776 11.8005C5.26766 11.8005 4.61749 11.7889 3.98396 11.7663C2.53416 11.7149 1.31743 10.5939 1.15384 9.15079C1.10408 8.71177 1.06878 8.2586 1.06878 7.79552C1.06878 7.33243 1.10408 6.87926 1.15384 6.44024C1.22159 5.84256 1.47021 5.3007 1.83914 4.86797L1.84808 4.85782ZM7.60611 3.8133V3.12575C7.60611 2.69125 7.43351 2.27454 7.12627 1.9673C6.81903 1.66006 6.40232 1.48745 5.96781 1.48745C5.53331 1.48745 5.11661 1.66006 4.80937 1.9673C4.50213 2.27454 4.32953 2.69125 4.32953 3.12575V3.81329C4.8543 3.79811 5.39427 3.79033 5.96776 3.79033C6.5413 3.79033 7.0813 3.79812 7.60611 3.8133Z"
              fill="#F6C324"
              fillOpacity="0.8"
            />
          </svg>
          {data?.alertId?.alarmStr}
        </span>
        <span className="text-white/80 leading-[14px] text-[14px] w-[90px] ">
          - °N
        </span>
        <span className="text-white/80 leading-[14px] text-[14px] w-[90px] ">
          - °E
        </span>
        <span className="text-white/80 leading-[14px] text-[14px] w-[140px] ">
          {new Date(parseInt(data.createdAt)).toLocaleString("mn-MN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
        <span className="px-[14px] py-2 flex items-center gap-[6px] text-white/80  rounded-[8px] text-[12px] leading-[12px] bg-[#F6C32429]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.57462 1.57462C2.62485 0.524383 4.14042 0 6 0C7.85958 0 9.37511 0.524383 10.4254 1.57462C11.4756 2.62485 12 4.14042 12 6C12 7.85958 11.4756 9.37511 10.4254 10.4254C9.37511 11.4756 7.85958 12 6 12C4.14042 12 2.62485 11.4756 1.57462 10.4254C0.524383 9.37511 0 7.85958 0 6C0 4.14042 0.524383 2.62485 1.57462 1.57462ZM2.75868 8.34612C2.43147 8.09609 2.3958 7.62298 2.65354 7.30181C2.92676 6.96136 3.23123 6.63583 3.52948 6.31696C3.56921 6.27448 3.60883 6.23212 3.64825 6.18986C3.81733 6.00859 4.10116 5.99753 4.28862 6.15972C4.33202 6.19727 4.37115 6.23053 4.40974 6.26335C4.52819 6.36404 4.64158 6.46045 4.85756 6.66292C5.66712 6.18187 6.17299 5.68211 6.66298 4.8575C6.46082 4.64186 6.36473 4.52881 6.26435 4.41071C6.23197 4.37263 6.19916 4.33403 6.1622 4.29129C5.99987 4.10356 6.01108 3.81926 6.19146 3.64879C6.24268 3.60039 6.29409 3.55154 6.34574 3.50246C6.6604 3.20349 6.98399 2.89604 7.32567 2.62985C7.63937 2.38547 8.0931 2.43035 8.33634 2.74493C8.38294 2.8052 8.42444 2.86345 8.47147 2.92945C8.55092 3.04097 8.64615 3.17465 8.80844 3.37765C9.38471 4.09855 9.38471 5.14238 8.80524 5.86072C8.37747 6.391 7.92894 6.9261 7.42754 7.42749C6.92614 7.92889 6.39106 8.37742 5.86076 8.80524C5.14244 9.38471 4.0986 9.38471 3.37771 8.80836C3.17509 8.64642 3.0407 8.55037 2.92852 8.4702C2.86783 8.42684 2.81364 8.38812 2.75868 8.34612Z"
              fill="#F6C324"
              fillOpacity="0.8"
            />
          </svg>
          {data.status}
        </span>
        <span className="px-[14px] ml-[35px] py-2 flex items-center gap-[6px] text-white/80  rounded-[8px] text-[12px] leading-[12px] bg-[#F6C32429]">
          {data.sosLvl}
        </span>
        <span className="px-[14px] ml-[45px] py-2 flex items-center gap-[6px] text-white/80  rounded-[8px] text-[12px] leading-[12px] bg-[#F6C32429]">
          {data.damageLvl}
        </span>
        <div className="absolute right-2">
          {" "}
          <BaruunSum />
        </div>
      </div>
    </div>
  );
}

export default SosReportList;
