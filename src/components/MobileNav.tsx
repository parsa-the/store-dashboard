import {
  Box,
  House,
  Menu,
  NotepadText,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  const SideBarItems = [
    { icon: House, route: "/Dashboard", title: "Dashboard" },
    { icon: ShoppingBag, route: "/Products", title: "Products" },
    { icon: NotepadText, route: "/Orders", title: "Orders" },
    { icon: Menu, route: "/Orders", title: "Orders" },
  ];

  return (
    <nav className="fixed bg-white border-t-2 border-t-slate-200 bottom-0 sm:hidden  w-full">
      <div className="w-full flex flex-row gap-1">
        {SideBarItems.map((items) => {
          const Icon = items.icon;

          return (
            <NavLink
              title={items.title}
              className={({ isActive }) =>
                `flex gap-2 sm:gap-3 flex-col transition-all duration-300 rounded-md font-semibold items-center text-xs sm:text-sm lg:text-base p-2 sm:p-3 lg:p-4 w-full ${
                  isActive ? "text-blue-500" : "text-zinc-500"
                }`
              }
              key={items.route}
              to={items.route}
            >
              <Icon className=" shrink-0" />
              <p>{items.title}</p>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
