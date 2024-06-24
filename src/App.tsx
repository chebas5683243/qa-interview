"use client";
import { CopyToClipboard } from "./components/copy-to-clipboard";
import { Header } from "./components/header";
import { AddQuestionModal } from "./components/modals/add-question-modal";
import { QuestionsList } from "./components/questions/questions-list";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto flex justify-between w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Questions</h1>
          <AddQuestionModal />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <CopyToClipboard />
          <QuestionsList />
        </div>
      </main>
    </div>
  );
}
