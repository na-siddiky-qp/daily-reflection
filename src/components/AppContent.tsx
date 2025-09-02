import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import type { AppState, ReflectionEntry, ReflectionFormData } from "../types";
import {
  generateId,
  getTodayDate,
  loadReflections,
  saveReflections,
} from "../utils";
import Navigation from "./Navigation";
import ReflectionForm from "./ReflectionForm";
import ReflectionHistory from "./ReflectionHistory";
import TodayComplete from "./TodayComplete";

const AppContent = () => {
  const { showToast } = useToast();
  const [appState, setAppState] = useState<AppState>({
    currentView: "today",
    reflections: [],
    todaysReflection: null,
    isSubmitting: false,
    hasSubmittedToday: false,
  });

  // Load reflections from localStorage on app start
  useEffect(() => {
    const loadedReflections = loadReflections();
    const todayDate = getTodayDate();
    const todaysReflection = loadedReflections.find(
      (r) => r.date === todayDate
    );

    setAppState((prev) => ({
      ...prev,
      reflections: loadedReflections.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
      todaysReflection: todaysReflection || null,
      hasSubmittedToday: !!todaysReflection,
    }));

    // Show welcome message for first-time users
    if (loadedReflections.length === 0) {
      setTimeout(() => {
        showToast(
          "Welcome to Daily Reflection! Start your mindfulness journey today. 🌟",
          "info"
        );
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const handleSubmitReflection = async (
    formData: ReflectionFormData
  ): Promise<void> => {
    const todayDate = getTodayDate();

    // Prevent multiple submissions for the same day
    if (appState.hasSubmittedToday) {
      showToast("You have already submitted a reflection for today", "error");
      throw new Error("You have already submitted a reflection for today");
    }

    setAppState((prev) => ({ ...prev, isSubmitting: true }));

    // Simulate network delay for better UX (as per TR001 - should complete in <500ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const newReflection: ReflectionEntry = {
        id: generateId(),
        date: todayDate,
        achievements: formData.achievements.trim(),
        anxieties: formData.anxieties.trim(),
        improvements: formData.improvements.trim(),
        createdAt: new Date().toISOString(),
      };

      const updatedReflections = [newReflection, ...appState.reflections];

      // Save to localStorage first
      saveReflections(updatedReflections);

      // Then update all state atomically
      setAppState((prev) => {
        const newState = {
          ...prev,
          reflections: updatedReflections,
          todaysReflection: newReflection,
          hasSubmittedToday: true,
          isSubmitting: false,
        };

        // Debug log to track state changes
        console.log("State updated after submission:", {
          hasSubmittedToday: newState.hasSubmittedToday,
          todaysReflection: newState.todaysReflection ? "exists" : "null",
          reflectionsCount: newState.reflections.length,
        });

        return newState;
      });

      // Show success message after state is updated
      setTimeout(() => {
        showToast("🎉 Your reflection has been saved successfully!", "success");
      }, 100);
    } catch (error) {
      setAppState((prev) => ({ ...prev, isSubmitting: false }));
      showToast("Failed to save your reflection. Please try again.", "error");
      throw error;
    }
  };

  const handleViewChange = (view: "today" | "history") => {
    setAppState((prev) => ({ ...prev, currentView: view }));

    // Show helpful tips when switching views
    if (view === "history" && appState.reflections.length === 0) {
      showToast(
        "Complete your first reflection to start building your history! 📚",
        "info"
      );
    }
  };

  const renderTodayView = () => {
    // Show loading state during submission
    if (appState.isSubmitting) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Saving your reflection...</p>
          </div>
        </div>
      );
    }

    // Show success view if today's reflection exists
    if (appState.hasSubmittedToday && appState.todaysReflection) {
      return <TodayComplete reflection={appState.todaysReflection} />;
    }

    // Show form for new reflection
    return (
      <ReflectionForm
        onSubmit={handleSubmitReflection}
        isSubmitting={appState.isSubmitting}
      />
    );
  };

  const renderHistoryView = () => {
    return <ReflectionHistory reflections={appState.reflections} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation
        currentView={appState.currentView}
        onViewChange={handleViewChange}
        hasSubmittedToday={appState.hasSubmittedToday}
        reflectionCount={appState.reflections.length}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {appState.currentView === "today"
            ? renderTodayView()
            : renderHistoryView()}
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="text-2xl">🌟</span>
              <h3 className="text-lg font-semibold text-gray-900">
                Daily Reflection
              </h3>
              <span className="text-2xl">🌟</span>
            </div>
            <p className="text-gray-600 mb-2">
              Build your mindfulness habit, one day at a time
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                📅{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {appState.reflections.length > 0 && (
                <span className="flex items-center gap-1">
                  📊 {appState.reflections.length} reflection
                  {appState.reflections.length !== 1 ? "s" : ""} saved
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppContent;
