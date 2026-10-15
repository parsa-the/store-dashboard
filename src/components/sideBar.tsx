import {
  Box,
  House,
  MoonStar,
  NotepadText,
  Settings,
  ShoppingBasketIcon,
  Square,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const SideBarItems = [
    { icon: House, route: "/Dashboard", title: "Dashboard" },
    { icon: ShoppingBasketIcon, route: "/Products", title: "Products" },
    { icon: NotepadText, route: "/Orders", title: "Orders" },
    { icon: Users, route: "/Coustomers", title: "Coustomers" },
    { icon: Box, route: "/Categories", title: "Categories" },
    { icon: Settings, route: "/Settings", title: "Settings" },
  ];

  return (
    <div className="h-dvh border-r-3 pt-8 justify-between p-3 border-r-slate-200 bg-slate-50 sm:w-[25%] lg:w-70 hidden sm:flex sm:flex-col">
      <div className="flex flex-col gap-7">
        <div className="font-bold gap-2 items-center flex justify-center text-center text-lg sm:text-xl lg:text-2xl">
          <Square className="rotate-44 text-blue-500 bg-blue-500 rounded-sm h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 shrink-0" />
          <p>StoreAdmin</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          {SideBarItems.map((items) => {
            const Icon = items.icon;

            return (
              <NavLink
                className={({ isActive }) =>
                  `flex gap-2 sm:gap-3 transition-all duration-300 rounded-md font-semibold items-center text-xs sm:text-sm lg:text-base  p-2 sm:p-3 lg:p-4 w-full ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-zinc-300 hover:text-zinc-700 text-zinc-500"
                  }`
                }
                key={items.route}
                to={items.route}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 shrink-0" />
                <span>{items.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <button className="flex gap-2  sm:gap-3 font-semibold items-center text-xs sm:text-sm lg:text-base text-zinc-500 p-2 sm:p-3 lg:p-4 w-full">
        <div className="p-1.5 bg-zinc-300 text-black rounded-lg shrink-0">
          <MoonStar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
        </div>
        <p>Light Mode</p>
      </button>
    </div>
  );
};

export default SideBar;
