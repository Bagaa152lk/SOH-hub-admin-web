import { matchPath, useLocation } from "react-router-dom";
import { BackgroundComponent } from "./type/type";

const Background: React.FC<BackgroundComponent> = ({ children }) => {
  const location = useLocation();

  const hideSidebarRoutes = [
    "/create-new-hothon",
    "/select-hothon",
    "/reset-password",
  ];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);
  const navigationHideRoutes = ["/camera-table/:id"];

  const shouldHideNavigation = navigationHideRoutes.some((path) =>
    matchPath(path, location.pathname)
  );
  return (
    <div
      className={`w-full min-h-screen pl-0 overflow-hidden ${
        !shouldHideSidebar &&
        `md:pl-[118px] ${!shouldHideNavigation ? "pt-[104px]" : "pt-[34px]"}`
      } bg-gradient-to-b from-[#3E4347] to-[#8c9195]  `}
    >
      {children}
    </div>
  );
};
export default Background;
