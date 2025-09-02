import React from "react";
import Button from "./ui/Button";

interface NavigationProps {
  currentView: "today" | "history";
  onViewChange: (view: "today" | "history") => void;
  hasSubmittedToday: boolean;
  reflectionCount: number;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  hasSubmittedToday,
  reflectionCount,
}) => {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">📔</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Daily Reflection
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Your mindfulness companion
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
            <Button
              onClick={() => onViewChange("today")}
              variant={currentView === "today" ? "primary" : "ghost"}
              size="sm"
              className={`
                relative transition-all duration-200 min-w-[100px]
                ${currentView === "today" ? "shadow-md" : "hover:bg-white/50"}
              `}
            >
              <span className="flex items-center space-x-2">
                <span className="text-lg">📝</span>
                <span className="font-medium">Today</span>
                {hasSubmittedToday && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </span>
            </Button>

            <Button
              onClick={() => onViewChange("history")}
              variant={currentView === "history" ? "primary" : "ghost"}
              size="sm"
              className={`
                relative transition-all duration-200 min-w-[100px]
                ${currentView === "history" ? "shadow-md" : "hover:bg-white/50"}
              `}
            >
              <span className="flex items-center space-x-2">
                <span className="text-lg">📚</span>
                <span className="font-medium">History</span>
                {reflectionCount > 0 && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full min-w-[20px] text-center font-semibold">
                    {reflectionCount > 99 ? "99+" : reflectionCount}
                  </span>
                )}
              </span>
            </Button>
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <div className="text-xs text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div
                className={`text-xs font-medium ${
                  hasSubmittedToday ? "text-green-600" : "text-amber-600"
                }`}
              >
                {hasSubmittedToday ? "✓ Completed" : "○ Pending"}
              </div>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                hasSubmittedToday ? "bg-green-400" : "bg-amber-400"
              } animate-pulse`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Status Bar */}
      <div className="md:hidden bg-gray-50 border-t border-gray-100 px-4 py-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span
            className={`font-medium flex items-center gap-1 ${
              hasSubmittedToday ? "text-green-600" : "text-amber-600"
            }`}
          >
            {hasSubmittedToday
              ? "✓ Today's reflection completed"
              : "○ Today's reflection pending"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
