import { useNavigate } from "react-router-dom";
import CamereIcon from "../../assets/componentsSvg/adminsvg/camereIcon";

function ShowCamereTable() {
  const navigate = useNavigate();

  const cameras = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    videoSource: `your-video-source-${index + 1}.mp4`,
    cameraName: `Camera ${index + 1}`,
  }));

  const sendDataToFullCamera = (cameraData: any) => {
    navigate(`/camera-table/${cameraData.id}`);
  };

  return (
    <div className="rounded-[18px] w-full h-full bg-black/10 overflow-hidden">
      <div className="w-full px-[18px] py-[19px] flex items-center justify-between bg-black/10">
        <div className="flex items-center gap-[16px]">
          <CamereIcon />
          <div className="text-[14px] text-white/90">Баруун хаалга</div>
        </div>
        <div></div>
      </div>
      <div className="w-full h-[830px] p-[20px] flex flex-col gap-[20px]">
        <div className="flex items-center gap-[10px]">
          <button className="text-center flex items-center gap-[16px] border border-white/5 rounded-[14px] px-[16px] py-[12px]">
            <span className="text-white/50">Бүх камер</span>
            <div className="min-w-[16px] min-h-[16px] rounded-[6px] bg-white/15"></div>
          </button>
          <button className="text-center flex items-center gap-[16px] bg-[#80ffb714] backdrop-opacity-50 rounded-[14px] px-[16px] py-[12px]">
            <span className="text-white/50">Баруун хаалга</span>
            <div className="min-w-[16px] min-h-[16px] rounded-[6px] bg-[#80ffb7]"></div>
          </button>
          <button className="text-center flex items-center gap-[16px] border border-white/5 rounded-[14px] px-[16px] py-[12px]">
            <span className="text-white/50">Авто зогсоол</span>
            <div className="min-w-[16px] min-h-[16px] rounded-[6px] bg-white/15"></div>
          </button>
          <button className="text-center flex items-center gap-[16px] border border-white/5 rounded-[14px] px-[16px] py-[12px]">
            <span className="text-white/50">Дулаан гараж</span>
            <div className="min-w-[16px] min-h-[16px] rounded-[6px] bg-white/15"></div>
          </button>
        </div>
        <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-[20px] bg">
          {/* Mapping through cameras */}
          {cameras.map((camera) => (
            <div
              onClick={() => {
                sendDataToFullCamera(camera);
              }}
              key={camera.id}
              className="col-span-1 row-span-1 relative bg-gradient-to-t from-[#FFC1074D] to-black/30 rounded-[14px]"
            >
              <video
                className="w-full h-full object-cover rounded-[14px]"
                src={camera.videoSource} // Use dynamic video source
                // Optional: Add controls for video playback
              />
              <div className="absolute leading-[1] bg-gray-500 text-white inline-block p-[6px] text-[10px] rounded-[6px] top-[8px] left-[8px]">
                *Recording
              </div>
              <div className="absolute bg-gray-700 text-white inline-block p-[6px] text-[10px] rounded-[6px] bottom-[8px] right-[8px]">
                {camera.cameraName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowCamereTable;
