import Header from "../components/header";
import MobileNav from "../components/MobileNav";
import SideBar from "../components/sideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex h-dvh w-full overflow-hidden bg-slate-50">
      <SideBar />
      <MobileNav/>
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;