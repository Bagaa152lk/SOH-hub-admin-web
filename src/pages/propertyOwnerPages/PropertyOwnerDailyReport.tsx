import { useState } from "react";
import DailyReportDashboard from "../../components/DailyReportDashboard";
import DailyReportList from "../../components/layouts/DailyReportList";
import { SelectedListContext } from "../../context/selectedListContext";
import { DailyReportListPropsDataType } from "../../type/type";
import SosAlert from "../../components/SosAlert";
import OgogdsonUureg from "../../components/OgogdsonUureg";
import UuregList from "../../components/UuregList";

export default function PropertyOwnerReport() {
  const [selectedReportList, setSelectedReportList] = useState(false);
  const [selectedReportData, setSelectedReportData] =
    useState<DailyReportListPropsDataType | null>(null);

  function handleSelect(data: DailyReportListPropsDataType) {
    setSelectedReportList(true);
    setSelectedReportData(data);
  }

  return (
    <SelectedListContext.Provider value={handleSelect}>
      <div className="w-full flex flex-wrap gap-[20px]">
        <div className="w-[1436px] h-[942px]">
          <DailyReportDashboard />
        </div>
        <div className="w-[312px] h-[942px]">
          {selectedReportList ? (
            <DailyReportList />
          ) : (
            <div className="w-full h-full flex flex-col gap-[20px]">
              <div className="w-full h-[562px]">
                <SosAlert />
              </div>
              <div className="w-full h-[360px]">
                <OgogdsonUureg/>
              </div>
            </div>
          )}
        </div>
      </div>
    </SelectedListContext.Provider>
  );
}
