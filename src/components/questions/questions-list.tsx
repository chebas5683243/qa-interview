import { useAppStore } from "@/hooks/use-app-store";
import { QuestionCard } from "./question-card";

export function QuestionsList() {
  const { questions } = useAppStore();

  return (
    <div className="flex flex-col gap-6">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
