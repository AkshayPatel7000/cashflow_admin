import React from "react";
import { RefreshCw, LogOutIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
function Header({ loadAllData, loading }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              CashFlow Admin Portal
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm sm:text-base"
            >
              <LogOutIcon
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Logout
            </button>
            <button
              onClick={loadAllData}
              disabled={loading}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
