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
import { PlusIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { SyntheticEvent, useState } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { v4 as uuid } from "uuid";

export function AddQuestionModal() {
  const { addQuestion } = useAppStore();

  const [form, setForm] = useState({
    title: "",
    answer: "",
  });

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!form.title || !form.answer) {
      return;
    }

    addQuestion({
      id: uuid(),
      title: form.title,
      answer: form.answer,
      tags: [],
    });

    setForm({
      title: "",
      answer: "",
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
        <Button variant="default" className="flex gap-2">
          <PlusIcon className="size-4" />
          <span className="hidden sm:block">Add Question</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
          <DialogDescription>
            Add new question to your list. Click save when you're done.
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
