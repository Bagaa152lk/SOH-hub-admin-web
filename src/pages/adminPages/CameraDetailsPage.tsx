import { useParams } from "react-router-dom";

function CameraDetailsPage() {
  const { id } = useParams(); // `id` will be the camera ID passed in the URL

  return (
    <div className="w-[1768px]  relative bg-gradient-to-t from-[#FFC1074D] to-black/30 rounded-[14px] ">
      <video
        className="w-full h-full object-cover rounded-[14px]"
        src={"my-srource"}
      />
      <div className="absolute leading-[1] bg-gray-500 text-white inline-block p-[6px] text-[10px] rounded-[6px] top-[8px] left-[8px]">
        *Recording
      </div>
      <div className="absolute bg-gray-700 text-white inline-block p-[6px] text-[10px] rounded-[6px] bottom-[8px] right-[8px]">
        camera {id}
      </div>
    </div>
  );
}

export default CameraDetailsPage;
