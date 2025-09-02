import React, { useState } from "react";
import type { ReflectionFormData } from "../types";
import { validateReflectionForm } from "../utils";
import Button from "./ui/Button";
import Card from "./ui/Card";
import ErrorAlert from "./ui/ErrorAlert";
import PageHeader from "./ui/PageHeader";
import TextArea from "./ui/TextArea";

interface ReflectionFormProps {
  onSubmit: (data: ReflectionFormData) => Promise<void>;
  isSubmitting: boolean;
}

const FORM_FIELDS = [
  {
    id: "achievements",
    key: "achievements" as keyof ReflectionFormData,
    label: "What went well today?",
    emoji: "🌟",
    placeholder:
      "Share your wins, accomplishments, or positive moments from today...",
    helpText: "Be specific about what made you proud and grateful",
  },
  {
    id: "anxieties",
    key: "anxieties" as keyof ReflectionFormData,
    label: "What made you anxious today?",
    emoji: "😰",
    placeholder: "Share your worries, stress, or challenges you faced today...",
    helpText: "It's healthy to acknowledge difficult feelings and situations",
  },
  {
    id: "improvements",
    key: "improvements" as keyof ReflectionFormData,
    label: "What could you improve tomorrow?",
    emoji: "🚀",
    placeholder:
      "Think about small steps you can take to grow or do better tomorrow...",
    helpText: "Focus on actionable steps and realistic goals",
  },
];

const ReflectionForm: React.FC<ReflectionFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<ReflectionFormData>({
    achievements: "",
    anxieties: "",
    improvements: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateReflectionForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);

      // Set field-specific errors
      const newFieldErrors: Record<string, string> = {};
      FORM_FIELDS.forEach((field) => {
        if (!formData[field.key].trim()) {
          newFieldErrors[field.key] = "This field is required";
        } else if (formData[field.key].length > 500) {
          newFieldErrors[field.key] = "Must be under 500 characters";
        }
      });
      setFieldErrors(newFieldErrors);
      return;
    }

    setErrors([]);
    setFieldErrors({});

    try {
      await onSubmit(formData);
    } catch {
      setErrors(["Failed to save reflection. Please try again."]);
    }
  };

  const handleChange = (field: keyof ReflectionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const isFormValid = FORM_FIELDS.every(
    (field) =>
      formData[field.key].trim().length > 0 && formData[field.key].length <= 500
  );

  const getProgressPercentage = () => {
    const completedFields = FORM_FIELDS.filter(
      (field) => formData[field.key].trim().length > 0
    ).length;
    return (completedFields / FORM_FIELDS.length) * 100;
  };

  return (
    <div className="animate-fadeIn">
      <PageHeader
        title="Today's Reflection"
        subtitle="Take a moment to mindfully reflect on your day"
        icon="📔"
      />

      <Card className="max-w-3xl mx-auto" padding="lg" shadow="xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(getProgressPercentage())}% complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          <ErrorAlert errors={errors} onDismiss={() => setErrors([])} />

          <div className="space-y-8">
            {FORM_FIELDS.map((field, index) => (
              <div
                key={field.id}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TextArea
                  id={field.id}
                  label={field.label}
                  emoji={field.emoji}
                  value={formData[field.key]}
                  placeholder={field.placeholder}
                  helpText={field.helpText}
                  maxLength={500}
                  disabled={isSubmitting}
                  onChange={(value) => handleChange(field.key, value)}
                  error={fieldErrors[field.key]}
                />
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!isFormValid}
              loading={isSubmitting}
              className="w-full"
              icon={!isSubmitting ? "💾" : undefined}
            >
              {isSubmitting
                ? "Saving your reflection..."
                : "Save Today's Reflection"}
            </Button>

            {!isFormValid && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Please complete all three questions to save your reflection
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ReflectionForm;
