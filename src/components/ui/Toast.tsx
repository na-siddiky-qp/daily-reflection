import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Allow fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-500",
      icon: "✅",
      border: "border-green-400",
    },
    error: {
      bg: "bg-red-500",
      icon: "❌",
      border: "border-red-400",
    },
    info: {
      bg: "bg-blue-500",
      icon: "ℹ️",
      border: "border-blue-400",
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        fixed top-20 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${
          isAnimating
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
      `}
    >
      <div
        className={`
        ${style.bg} text-white rounded-lg shadow-lg border-l-4 ${style.border}
        p-4 flex items-center space-x-3
      `}
      >
        <span className="text-xl">{style.icon}</span>
        <p className="font-medium flex-1">{message}</p>
        <button
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 300);
          }}
          className="text-white/80 hover:text-white transition-colors"
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
