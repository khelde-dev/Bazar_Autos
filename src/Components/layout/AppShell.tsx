import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * Authenticated shell. Sidebar on desktop, sheet drawer on mobile.
 * Pages render inside <main> via <Outlet />.
 */
export const AppShell = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Desktop sidebar (lg+) */}
        <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-20">
          <Sidebar />
        </div>

        {/* Main column */}
        <div className="flex min-h-screen w-full flex-col lg:pl-64">
          <Topbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
