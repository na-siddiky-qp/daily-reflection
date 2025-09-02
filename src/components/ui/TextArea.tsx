import React from "react";

interface TextAreaProps {
  id: string;
  label: string;
  emoji: string;
  value: string;
  placeholder: string;
  helpText: string;
  maxLength?: number;
  disabled?: boolean;
  onChange: (value: string) => void;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  emoji,
  value,
  placeholder,
  helpText,
  maxLength = 500,
  disabled = false,
  onChange,
  error,
}) => {
  const characterCount = value.length;

  const getCharacterCountColor = (count: number) => {
    if (count > maxLength * 0.9) return "text-red-500";
    if (count > maxLength * 0.7) return "text-yellow-500";
    return "text-gray-400";
  };

  const hasError = !!error;

  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="block text-lg font-semibold text-gray-900 flex items-center gap-2"
      >
        <span className="text-2xl">{emoji}</span>
        {label}
      </label>

      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border rounded-xl resize-none h-32 text-gray-900
            transition-all duration-200 focus:outline-none focus:ring-2
            ${
              hasError
                ? "border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          maxLength={maxLength}
          disabled={disabled}
          rows={4}
        />

        {hasError && (
          <div className="absolute inset-0 pointer-events-none border-2 border-red-300 rounded-xl animate-pulse" />
        )}
      </div>

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{helpText}</p>
          {hasError && (
            <p className="text-sm text-red-600 font-medium mt-1 flex items-center gap-1">
              <span>⚠️</span>
              {error}
            </p>
          )}
        </div>

        <div className="ml-4 text-right">
          <span
            className={`text-sm font-medium ${getCharacterCountColor(
              characterCount
            )}`}
          >
            {characterCount}/{maxLength}
          </span>
          {characterCount > maxLength * 0.8 && (
            <div className="text-xs text-gray-500 mt-1">
              {maxLength - characterCount} left
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextArea;
