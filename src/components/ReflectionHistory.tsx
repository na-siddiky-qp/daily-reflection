import React, { useState } from "react";
import type { ReflectionEntry } from "../types";
import { formatDisplayDate, getTimeAgo } from "../utils";
import Button from "./ui/Button";
import Card from "./ui/Card";
import PageHeader from "./ui/PageHeader";

interface ReflectionHistoryProps {
  reflections: ReflectionEntry[];
}

const REFLECTION_SECTIONS = [
  {
    key: "achievements" as keyof ReflectionEntry,
    title: "What went well",
    emoji: "🌟",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    key: "anxieties" as keyof ReflectionEntry,
    title: "What made you anxious",
    emoji: "😰",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    key: "improvements" as keyof ReflectionEntry,
    title: "What to improve",
    emoji: "🚀",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
];

const ReflectionCard: React.FC<{
  reflection: ReflectionEntry;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ reflection, isExpanded, onToggle }) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg" padding="lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {formatDisplayDate(reflection.date)}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span>🕐</span>
              {getTimeAgo(reflection.date)}
            </span>
            <span className="flex items-center gap-1">
              <span>⏰</span>
              {new Date(reflection.createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle} className="ml-4">
          {isExpanded ? "🔼 Collapse" : "🔽 Expand"}
        </Button>
      </div>

      {isExpanded ? (
        <div className="space-y-4 animate-slideUp">
          {REFLECTION_SECTIONS.map((section, index) => (
            <div
              key={section.key}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-base">
                <span className="mr-2 text-lg">{section.emoji}</span>
                {section.title}
              </h4>
              <div
                className={`${section.bgColor} p-3 rounded-lg border-l-4 ${section.borderColor}`}
              >
                <p className="text-gray-800 leading-relaxed text-sm">
                  {reflection[section.key] as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {REFLECTION_SECTIONS.map((section) => (
            <div key={section.key} className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0">{section.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 truncate">
                  {(reflection[section.key] as string).slice(0, 80)}
                  {(reflection[section.key] as string).length > 80 ? "..." : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

const EmptyState: React.FC = () => (
  <div className="text-center py-16 animate-fadeIn">
    <div className="mb-8">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-4xl">📖</span>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      No reflections yet
    </h2>
    <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
      Start your daily reflection journey today. Your past reflections will
      appear here for you to review and learn from your growth over time.
    </p>
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm mx-auto">
      <p className="text-blue-800 text-sm font-medium">
        💡 Tip: Consistent daily reflection helps build self-awareness and
        personal growth habits.
      </p>
    </div>
  </div>
);

const ReflectionHistory: React.FC<ReflectionHistoryProps> = ({
  reflections,
}) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const displayedReflections = showAll ? reflections : reflections.slice(0, 5);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    if (expandedCards.size === displayedReflections.length) {
      setExpandedCards(new Set());
    } else {
      setExpandedCards(new Set(displayedReflections.map((r) => r.id)));
    }
  };

  if (reflections.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="animate-fadeIn">
      <PageHeader
        title="Past Reflections"
        subtitle="Review your journey of growth and self-discovery"
        icon="📚"
        action={
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              icon={
                expandedCards.size === displayedReflections.length ? "🔼" : "🔽"
              }
            >
              {expandedCards.size === displayedReflections.length
                ? "Collapse All"
                : "Expand All"}
            </Button>
          </div>
        }
      />

      <div className="space-y-6 max-w-4xl mx-auto">
        {displayedReflections.map((reflection, index) => (
          <div
            key={reflection.id}
            className="animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ReflectionCard
              reflection={reflection}
              isExpanded={expandedCards.has(reflection.id)}
              onToggle={() => toggleCard(reflection.id)}
            />
          </div>
        ))}
      </div>

      {reflections.length > 5 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            icon={showAll ? "🔼" : "🔽"}
          >
            {showAll
              ? "Show Less"
              : `Show ${reflections.length - 5} More Reflections`}
          </Button>
        </div>
      )}

      <div className="text-center py-8 border-t border-gray-200 mt-12">
        <Card className="max-w-md mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
          <div className="text-center">
            <h4 className="font-semibold text-indigo-900 mb-2 flex items-center justify-center gap-2">
              <span>📊</span>
              Your Progress
            </h4>
            <p className="text-indigo-800 text-lg font-bold mb-1">
              {reflections.length} reflection
              {reflections.length !== 1 ? "s" : ""} completed
            </p>
            <p className="text-indigo-700 text-sm">
              Keep building your mindfulness habit!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReflectionHistory;
