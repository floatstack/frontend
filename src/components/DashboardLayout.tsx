import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "./ui/input";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen relative bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <button
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search here..."
                className="pl-9 bg-background"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
