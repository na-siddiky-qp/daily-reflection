import type { ReflectionEntry } from "./types";

export const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

export const saveReflections = (reflections: ReflectionEntry[]): void => {
  try {
    localStorage.setItem("daily-reflections", JSON.stringify(reflections));
  } catch (error) {
    console.error("Failed to save reflections:", error);
  }
};

export const loadReflections = (): ReflectionEntry[] => {
  try {
    const stored = localStorage.getItem("daily-reflections");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load reflections:", error);
    return [];
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateReflectionForm = (data: {
  achievements: string;
  anxieties: string;
  improvements: string;
}): string[] => {
  const errors: string[] = [];

  if (!data.achievements.trim()) {
    errors.push("Please share what went well today");
  }

  if (!data.anxieties.trim()) {
    errors.push("Please share what made you anxious today");
  }

  if (!data.improvements.trim()) {
    errors.push("Please share what you could improve tomorrow");
  }

  // Character limits (reasonable for mobile typing)
  if (data.achievements.length > 500) {
    errors.push("Achievements section should be under 500 characters");
  }

  if (data.anxieties.length > 500) {
    errors.push("Anxieties section should be under 500 characters");
  }

  if (data.improvements.length > 500) {
    errors.push("Improvements section should be under 500 characters");
  }

  return errors;
};
