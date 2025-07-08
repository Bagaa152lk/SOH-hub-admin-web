import Lottie from "lottie-react";
import loadingSideBar from "../../lottie/loading-side-bar.json";
export default function SideBarLoading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie animationData={loadingSideBar} />
    </div>
  );
}
