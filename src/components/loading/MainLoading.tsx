import Lottie from "lottie-react";
import loading from "../../lottie/loading-side-bar.json";
export default function MainLoading() {
  return (
    <div className="w-full h-full  flex items-center justify-center">
      <div className="w-[500px] ">
        <Lottie animationData={loading} />
      </div>
    </div>
  );
}
