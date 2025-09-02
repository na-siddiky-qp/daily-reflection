import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
}) => {
  return (
    <div className="text-center mb-8">
      {icon && (
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl">{icon}</span>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {title}
      </h1>

      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default PageHeader;
