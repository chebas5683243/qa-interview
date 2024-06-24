import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/types/question";
import { EditQuestionModal } from "../modals/edit-question-modal";
import { DeleteQuestionModal } from "../modals/delete-question-modal";
import { useAppStore } from "@/hooks/use-app-store";

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  const { query } = useAppStore();

  const queryWords = query.split(" ");

  const title = query
    ? question.title.replace(
        new RegExp(queryWords.join("|"), "gi"), // Create regex pattern with all search terms
        (match) => `<mark>${match}</mark>` // Wrap matches in <mark> tags for highlighting
      )
    : question.title;

  const answer = query
    ? question.answer.replace(
        new RegExp(queryWords.join("|"), "gi"), // Create regex pattern with all search terms
        (match) => `<mark>${match}</mark>` // Wrap matches in <mark> tags for highlighting
      )
    : question.answer;

  return (
    <Card className="relative group">
      <div className="hidden group-hover:flex absolute right-0 top-0 p-2 gap-2">
        <EditQuestionModal question={question} />
        <DeleteQuestionModal question={question} />
      </div>
      <CardHeader>
        <CardTitle dangerouslySetInnerHTML={{ __html: title }} />
      </CardHeader>
      <CardContent
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </Card>
  );
}
