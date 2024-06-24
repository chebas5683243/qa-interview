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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SyntheticEvent, useState } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { Question } from "@/types/question";
import { Edit } from "lucide-react";

interface Props {
  question: Question;
}

export function EditQuestionModal({ question }: Props) {
  const { updateQuestion } = useAppStore();

  const [form, setForm] = useState({
    title: question.title,
    answer: question.answer,
  });

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!form.title || !form.answer) {
      return;
    }

    updateQuestion({
      id: question.id,
      title: form.title,
      answer: form.answer,
      tags: [],
    });
  }

  function onChange(event: SyntheticEvent) {
    const target = event.target as HTMLTextAreaElement;
    setForm({
      ...form,
      [target.id]: target.value,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="Edit">
          <Edit className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Edit question information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="title">Title</Label>
              <Textarea
                id="title"
                placeholder="Question title"
                className="min-h-10"
                value={form.title}
                onChange={onChange}
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                placeholder="Type your answer..."
                className="col-span-3 min-h-40"
                value={form.answer}
                onChange={onChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
