import SosAlert from "../../components/SosAlert";
import ShowCamereTable from "../../components/camera/ShowCamaraTable";

export default function AllCamera() {
  return (
    <div className="w-full flex flex-wrap gap-[20px]">
      <div className="w-[1436px] h-[942px]">
        <ShowCamereTable />
      </div>
      <div className="w-[312px] h-[942px] ">
        <SosAlert />
      </div>
    </div>
  );
}
