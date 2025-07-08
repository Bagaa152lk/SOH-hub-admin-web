function CameraSmallCard() {
  return (
    <div className="relative aspect-square bg-black rounded-[14px] h-[94px]">
      <video
        className="w-full h-full object-cover rounded-[14px]"
        src="your-video-source.mp4"
      />

      <div className="absolute leading-[10px] bg-gray-500 text-white flex items-center gap-[3px] p-[6px] text-[10px] rounded-[6px] top-[8px] left-[8px] ">
        <div className="w-[4px] h-[4px] bg-[#80FFB7] rounded-full" /> Rec
      </div>

      <div className="absolute bg-gray-700 text-white inline-block p-[6px] leading-[10px] text-[10px] rounded-[6px] bottom-[8px] right-[8px]">
        Camera 1
      </div>
    </div>
  );
}

export default CameraSmallCard;
