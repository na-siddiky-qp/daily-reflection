import React from "react";

interface ErrorAlertProps {
  errors: string[];
  onDismiss?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errors, onDismiss }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-fadeIn">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-red-400 text-xl">⚠️</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Please fix the following issues:
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="leading-relaxed">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {onDismiss && (
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onDismiss}
              className="inline-flex text-red-400 hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors duration-150"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
