import { NavLink } from "react-router-dom";
import { Home, Users, Gauge, Zap, FileText, Settings, X, LogOut } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { useAuth } from "./context/AuthContext";
import { Button } from "./ui/button";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/agents", icon: Users, label: "Agent Management" },
  { to: "/liquidity", icon: Gauge, label: "Liquidity Monitor", },
  { to: "/atm", icon: Zap, label: "ATM Monitor" },
  { to: "/compliance", icon: FileText, label: "Compliance and Report" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

  const { user, logout } = useAuth();
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r shadow-sm flex flex-col transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <Logo />
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-active text-sidebar-active-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-active/50"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span className="flex-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            OS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Osomhe</div>
            <div className="text-xs text-muted-foreground truncate">
              osomhe@zenith.com
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
