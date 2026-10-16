import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="hidden w-full flex-col gap-3 border-b sticky top-0 border-slate-200 bg-slate-50 p-3 sm:flex sm:h-20 sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-8 lg:px-10">
      {/* Search */}
      <div className="flex h-10 w-full min-w-0 items-center rounded-lg border border-zinc-200 bg-zinc-100 px-2 shadow sm:h-full sm:max-w-xs md:max-w-sm lg:w-100 lg:max-w-none">
        <Search size={20} className="shrink-0 text-zinc-500" />

        <input
          type="text"
          name="search"
          placeholder="Search Products..."
          className="h-full min-w-0 flex-1 bg-transparent pl-2 text-sm text-black outline-none placeholder:text-zinc-500"
        />
      </div>

      {/* User infoo */}
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <button
          type="button"
          aria-label="Notifications"
          className="shrink-0 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-200"
        >
          <Bell size={21} />
        </button>

        <img
          src="/2.jpg"
          alt="Ali Ghafari"
          className="size-9 shrink-0 rounded-full object-cover sm:size-10 lg:size-12"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-600 sm:text-base">
            Ali Ghafari
          </p>
          <p className="text-xs text-zinc-400 sm:text-sm">Admin</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
