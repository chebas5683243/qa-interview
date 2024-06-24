import { Question } from "@/types/question";
import { create } from "zustand";

interface State {
  query: string;
  questionsDB: Question[];
  questions: Question[];
}

interface Actions {
  setQuery: (query: string) => void;
  resetQuery: () => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (questionId: string) => void;
}

function getQuestionsFromLocalStorage() {
  const questions = localStorage.getItem("questions");
  return questions ? JSON.parse(questions) : [];
}

function updateQuestionsInLocalStorage(questions: Question[]) {
  localStorage.setItem("questions", JSON.stringify(questions));
}

export const useAppStore = create<State & Actions>((set) => ({
  query: "",
  questionsDB: getQuestionsFromLocalStorage(),
  questions: getQuestionsFromLocalStorage(),
  setQuery: (query) =>
    set((state) => {
      if (!query) {
        return {
          ...state,
          query,
          questions: state.questionsDB,
        };
      }

      const queryWords = query.split(" ");

      const questions = state.questionsDB.filter((q) =>
        queryWords.every(
          (word) =>
            q.title.toLowerCase().includes(word.toLowerCase()) ||
            q.answer.toLowerCase().includes(word.toLowerCase()) ||
            q.tags.some((tag) => tag.toLowerCase().includes(word.toLowerCase()))
        )
      );

      return {
        ...state,
        query,
        questions,
      };
    }),
  resetQuery: () =>
    set((state) => ({
      ...state,
      query: "",
      questions: state.questionsDB,
    })),
  addQuestion: (question) =>
    set((state) => {
      const newQuestions = [...state.questionsDB, question];
      updateQuestionsInLocalStorage(newQuestions);

      return {
        ...state,
        query: "",
        questions: newQuestions,
        questionsDB: newQuestions,
      };
    }),
  updateQuestion: (question) =>
    set((state) => {
      const newQuestions = state.questionsDB.map((q) =>
        q.id === question.id ? question : q
      );
      updateQuestionsInLocalStorage(newQuestions);

      return {
        ...state,
        query: "",
        questions: newQuestions,
        questionsDB: newQuestions,
      };
    }),
  deleteQuestion: (questionId) =>
    set((state) => {
      const newQuestions = state.questionsDB.filter((q) => q.id !== questionId);
      updateQuestionsInLocalStorage(newQuestions);

      return {
        ...state,
        query: "",
        questions: newQuestions,
        questionsDB: newQuestions,
      };
    }),
}));
