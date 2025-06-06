import { useState, useEffect } from "react";
import { Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuth } from "@/services/authService";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "People", path: "/people" },
    { name: "Hiring", path: "/hiring" },
    { name: "Salary", path: "/salary" },
    { name: "Reviews", path: "/reviews" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await checkAuth();
        setUser(user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (isLoading) {
    return <div className="w-full h-[180px] bg-[#FBFBFB]">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full bg-[#FBFBFB] h-[180px] relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[40px] w-[1360px] max-w-[95%] h-[80px] bg-gradient-to-r from-[#2784B8] to-[#113B52] hover:from-[#1f6b94] hover:to-[#0d2e40] text-white border-radius-0 flex items-center justify-between px-10">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-white mr-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="text-white font-bold text-2xl tracking-wide">
            GIGFLOWW
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className={`px-4 py-2 rounded-[50px] text-xl ${isActive(item.path)
                  ? "bg-white text-[#31AEF3] font-medium"
                  : "text-white font-normal hover:bg-white/10"
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-5">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Settings className="w-6 h-6 text-[#31AEF3]" />
          </div>

          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative">
            <Bell className="w-6 h-6 fill-[#31AEF3] text-[#31AEF3]" />
            {user.notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#B20913] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">
                  {user.notificationCount}
                </span>
              </div>
            )}
          </div>

          <div className="w-[50px] h-[50px] bg-[#B74E48] rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-lg">
              {getInitials(user?.name || "")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}