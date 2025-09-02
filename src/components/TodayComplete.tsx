import React from "react";
import type { ReflectionEntry } from "../types";
import { formatDisplayDate } from "../utils";
import Card from "./ui/Card";
import SuccessMessage from "./ui/SuccessMessage";

interface TodayCompleteProps {
  reflection: ReflectionEntry;
}

const REFLECTION_SECTIONS = [
  {
    key: "achievements" as keyof ReflectionEntry,
    title: "What went well today",
    emoji: "🌟",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    key: "anxieties" as keyof ReflectionEntry,
    title: "What made you anxious today",
    emoji: "😰",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    key: "improvements" as keyof ReflectionEntry,
    title: "What to improve tomorrow",
    emoji: "🚀",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
];

const TodayComplete: React.FC<TodayCompleteProps> = ({ reflection }) => {
  const encouragementMessages = [
    "Great job on maintaining your reflection habit! 🎯",
    "You're building mindfulness one day at a time! 🧘‍♀️",
    "Consistent reflection leads to personal growth! 🌱",
    "You've completed another day of self-discovery! 🔍",
  ];

  const randomMessage =
    encouragementMessages[
      Math.floor(Math.random() * encouragementMessages.length)
    ];

  return (
    <div className="animate-fadeIn">
      <SuccessMessage
        title="Reflection Complete!"
        message={`You've successfully completed your reflection for ${formatDisplayDate(
          reflection.date
        )}`}
        icon="✨"
        action={
          <div className="space-y-6">
            <Card className="max-w-2xl mx-auto text-left" shadow="lg">
              <div className="space-y-6">
                {REFLECTION_SECTIONS.map((section, index) => (
                  <div
                    key={section.key}
                    className="animate-slideUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-lg">
                      <span className="mr-3 text-2xl">{section.emoji}</span>
                      {section.title}
                    </h4>
                    <div
                      className={`${section.bgColor} p-4 rounded-lg border-l-4 ${section.borderColor} shadow-sm`}
                    >
                      <p className="text-gray-800 leading-relaxed">
                        {reflection[section.key] as string}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-500">
                  <p className="flex items-center justify-center gap-2">
                    <span>🕐</span>
                    Submitted at{" "}
                    {new Date(reflection.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </p>
                </div>
              </div>
            </Card>

            <div className="max-w-md mx-auto">
              <Card
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                padding="md"
              >
                <div className="text-center">
                  <p className="text-blue-800 font-semibold text-sm mb-2">
                    {randomMessage}
                  </p>
                  <p className="text-blue-700 text-sm">
                    Come back tomorrow for your next daily reflection.
                  </p>
                </div>
              </Card>
            </div>

            <div className="text-center max-w-md mx-auto">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2 flex items-center justify-center gap-2">
                  <span>🔒</span>
                  One Reflection Per Day
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To maintain the authenticity of your daily practice, you can
                  only submit one reflection per day. This helps build genuine
                  habits and prevents overthinking.
                </p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default TodayComplete;
