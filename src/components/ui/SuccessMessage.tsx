import React from "react";

interface SuccessMessageProps {
  title: string;
  message: string;
  icon?: string;
  action?: React.ReactNode;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title,
  message,
  icon = "✅",
  action,
}) => {
  return (
    <div className="text-center space-y-6 animate-fadeIn">
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
          <span className="text-4xl">{icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>

      {action && <div className="space-y-4">{action}</div>}
    </div>
  );
};

export default SuccessMessage;
