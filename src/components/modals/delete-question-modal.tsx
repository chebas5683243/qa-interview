import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import { Question } from "@/types/question";
import { Trash } from "lucide-react";

interface Props {
  question: Question;
}

export function DeleteQuestionModal({ question }: Props) {
  const { deleteQuestion } = useAppStore();

  function onDelete() {
    deleteQuestion(question.id);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" aria-label="Delete">
          <Trash className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Estás seguro que quieres eliminar la pregunta{" "}
            <strong>{question.title}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
