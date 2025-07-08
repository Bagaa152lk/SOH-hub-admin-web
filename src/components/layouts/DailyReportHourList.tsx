import { useState } from "react";
import CamereIcon from "../../assets/componentsSvg/adminsvg/camereIcon";
import DooshooZaasanBultsgarSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanBultsgarSum";

const mockData = [
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },
  {
    time: "02:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 12,
    details: [{ timeRange: "01ц 10м", description: "Гадны хүн ирсэн" }],
    images: ["/image/dailyReportImg.png", "/image/dailyReportImg.png"],
  },

  {
    time: "04:00 цаг",
    issue: "Зөрчил гарсан",
    issueCount: 5,
    details: [{ timeRange: "03ц 45м", description: "Тамхи татсан" }],
    images: ["/image/dailyReportImg.png"],
  },
];

function DailyReportHourList() {
  const [clickShow, setClickShow] = useState<boolean[]>(
    mockData.map(() => false)
  );

  const toggleShow = (index: number) => {
    setClickShow((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-[10px] w-full ">
      {mockData.map((data, index) => (
        <div
          key={index}
          className={`${
            clickShow[index]
              ? "h-auto  rounded-[14px] ring-[1px] ring-white/15"
              : "overflow-hidden h-[58px] bg-white/10 rounded-[14px]"
          }`}
        >
          <div
            className={`h-[58px] w-full rounded-tl-[14px] rounded-tr-[14px]  flex items-center justify-between px-[16px] `}
          >
            <div className="flex items-center gap-[10px]">
              <CamereIcon color={clickShow[index] ? "#80FFB7" : "white"} />
              <div className="flex flex-col">
                <div className="text-[14px] text-white/90">{data.time}</div>
                <div className="flex items-center gap-[6px]">
                  <div className="text-[12px] text-white/50">{data.issue}</div>
                  <div className="text-[10px] bg-white/10 text-white/30 flex items-center px-[8px] rounded-[55px]">
                    {data.issueCount}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleShow(index)}
              className={`${
                clickShow[index] ? "rotate-180" : "rotate-0"
              } transform transition-all duration-300`}
            >
              <DooshooZaasanBultsgarSum
                color={clickShow[index] ? "#80FFB7" : "white"}
              />
            </button>
          </div>

          {/* Collapsible Content */}
          {clickShow[index] && (
            <div className="w-full h-auto px-[20px] border-t-[1px] border-white/15">
              {data.details.map((detail, detailIndex) => (
                <div
                  key={detailIndex}
                  className="flex gap-[6px] items-center mt-[15px]"
                >
                  <div className="h-[1px] w-[8px] bg-[#80FFB7]" />
                  <div className="text-[12px] leading-[12px] text-white/50">
                    {detail.timeRange} - {detail.description}
                  </div>
                </div>
              ))}
              <div className="py-[20px] flex gap-[8px]">
                {data.images.map((imgSrc, imgIndex) => (
                  <img key={imgIndex} src={imgSrc} alt="Additional Content" />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DailyReportHourList;
