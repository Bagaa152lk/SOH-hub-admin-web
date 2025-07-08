import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import DashboardTable from "./pages/adminPages/DashboardTable";
import PropertyOwnerNavigation from "./components/PropertyOwnerNavigation";
import AdminNavigation from "./components/AdminNavigation";
import Navigation from "./components/PropertyOwnerNavigation";
import Background from "./Background";
import Object from "./pages/adminPages/Object";
import ReportDashboard from "./pages/adminPages/ReportDashboard";
import CameraDetailsPage from "./pages/adminPages/CameraDetailsPage";
import Login from "./auth/Login";
// import ResetPassword from "./auth/ResetPassword"; // Assuming you have this page
import { useEffect, useMemo, useState } from "react";
import HomeOwners from "./components/HomeOwners";

// import SelectHothonTable from "./pages/adminPages/SelectHothonTable";
import CreateNewHothon from "./pages/adminPages/CreateNewHothon";
import SideBar from "./components/SideBar";
import OwnerSideBar from "./components/OwnerSideBar";
import { ME } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import RoleWarningPage from "./pages/adminPages/RoleWarningPage";
import AllGuardsTable from "./pages/adminPages/AllGuardsTable";
import AllCamera from "./pages/adminPages/AllCamera";
import SosTable from "./pages/adminPages/SosTable";
import ResetPass from "./auth/ResetPassword";
import { useAtom } from "jotai";
import { showSideBarAtom } from "./hook/showSideBar";
import Lottie from "lottie-react";
import loadingErrorData from "./lottie/loading-server-error.json";
import loadingData from "./lottie/loading.json";
import HomeOwnerDashboardTable from "./pages/propertyOwnerPages/HomeOwnerDashboard";
import FeedbackPage from "./pages/adminPages/FeedbackPage";
import Permission from "./pages/adminPages/Permission";
import PropertyOwnerGuards from "./pages/propertyOwnerPages/PropertyOwnerGuards";
import PropertyFeedbackPage from "./pages/propertyOwnerPages/PropertyOwnerFeedback";
import PropertyOwnerSosTable from "./pages/propertyOwnerPages/PropertyOwnerSosTable";
import PropertyOwnerPermission from "./pages/propertyOwnerPages/PropertyOwnerPermission";
import PropertyOwnerReport from "./pages/propertyOwnerPages/PropertyOwnerDailyReport";
// import GuardTaskPage from "./pages/adminPages/GuardTask";
import PropertyOwnerGuardTask from "./pages/propertyOwnerPages/PropertyOwnerGuardTask";
import PropertyOwnerToolsPage from "./pages/propertyOwnerPages/PropertyOwnerToolsPage";
import { useNavigate } from "react-router-dom";
import PropertyAllCamera from "./pages/propertyOwnerPages/PropertyOwnerAllCamera";
// geh metchilen lazy deh ystoi shv martchij yuni magad bichchihy

const GuardTaskPage = lazy(() => import("./pages/adminPages/GuardTask"));
const SelectHothonTable = lazy(
  () => import("./pages/adminPages/SelectHothonTable")
);
enum UserRole {
  soh = "soh",
  admin = "admin",
  guard = "guard",
}

interface User {
  _id: string;
  role: UserRole;
}
export default function AppContent() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: "cache-first",
  });

  const [showSideBar] = useAtom(showSideBarAtom);
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

  const isHomeOwnerPage = matchPath("/home-owner/:id/*", location.pathname);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data?.me);
    }
  }, [data]);

  if (loading)
    return (
      <div className="w-full h-screen overflow-hidden bg-black/30 flex items-center justify-center">
        <Lottie
          animationData={loadingData}
          loop
          style={{ width: 200, height: 200 }}
        />
      </div>
    );
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    );
  }

  if (data?.me?.role !== UserRole.admin) {
    if (data?.me?.role === UserRole.soh) {
      return <RoleWarningPage />;
    } else if (data?.me?.role === UserRole.guard) {
      return (
        <div className="w-full h-full bg-white/80 flex justify-center items-center">
          Таны нэвтрэх статус хамгаалагч тул хамгаалагчын апп аар орно уу
        </div>
      );
    } else {
      return (
        <div className="w-full h-screen bg-gradient-to-t from-green-400 flex justify-center items-center">
          <div className="text-white">
            {" "}
            Таны Token хугацаа дууссан байна дахин нэвтрэх бол{" "}
            <button
              className=" text-red-500 text-[18px] px-2"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              ДАРНА УУ
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <Background>
      {/* Only render PropertyOwnerNavigation and SideBar if it's not a /home-owner/:id route */}
      {!shouldHideSidebar && !shouldHideNavigation && !isHomeOwnerPage ? (
        <AdminNavigation />
      ) : (
        <PropertyOwnerNavigation />
      )}
      {!showSideBar && !shouldHideSidebar && !isHomeOwnerPage ? (
        <SideBar />
      ) : (
        <OwnerSideBar />
      )}
      <Suspense
        fallback={
          <div className="w-full h-screen overflow-hidden bg-black/30 flex items-center justify-center">
            <Lottie
              animationData={loadingData}
              loop
              style={{ width: 200, height: 200 }}
            />
          </div>
        }
      >
        <Routes>
          {/* redirect route */}
          <Route index element={<DashboardTable />} />
          {/* all exact routes BEFORE catch-all */}
          <Route path="/dashboard" element={<DashboardTable />} />

          <Route path="/guard-task" element={<GuardTaskPage />} />
          <Route path="/select-hothon" element={<SelectHothonTable />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/all-guards" element={<AllGuardsTable />} />
          <Route path="/object-table" element={<Object />} />
          <Route path="/daily-report" element={<ReportDashboard />} />
          <Route path="/camera-table" element={<AllCamera />} />
          <Route path="/permission" element={<Permission />} />
          <Route path="/camera-table/:id" element={<CameraDetailsPage />} />
          <Route path="/sos" element={<SosTable />} />
          <Route path="/create-new-hothon" element={<CreateNewHothon />} />

          {/* home-owner routes */}
          <Route path="/home-owner/:id" element={<HomeOwnerDashboardTable />} />
          <Route
            path="/home-owner/:id/guards-table"
            element={<PropertyOwnerGuards />}
          />
          <Route
            path="/home-owner/:id/guard-task"
            element={<PropertyOwnerGuardTask />}
          />
          <Route
            path="/home-owner/:id/feedback"
            element={<PropertyFeedbackPage />}
          />
          <Route
            path="/home-owner/:id/sos"
            element={<PropertyOwnerSosTable />}
          />
          <Route
            path="/home-owner/:id/permission"
            element={<PropertyOwnerPermission />}
          />
          <Route
            path="/home-owner/:id/tools"
            element={<PropertyOwnerToolsPage />}
          />
          <Route
            path="/home-owner/:id/daily-report"
            element={<PropertyOwnerReport />}
          />
          <Route
            path="/home-owner/:id/camera-table"
            element={<PropertyAllCamera />}
          />

          {/* catch-all fallback route — should be LAST */}
          <Route path="/*" element={<DashboardTable />} />
        </Routes>
      </Suspense>
    </Background>
  );
}
