export interface ReflectionEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  achievements: string;
  anxieties: string;
  improvements: string;
  createdAt: string; // ISO string
}

export interface ReflectionFormData {
  achievements: string;
  anxieties: string;
  improvements: string;
}

export interface AppState {
  currentView: "today" | "history";
  reflections: ReflectionEntry[];
  todaysReflection: ReflectionEntry | null;
  isSubmitting: boolean;
  hasSubmittedToday: boolean;
}
