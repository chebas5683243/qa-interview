import { useState } from "react";
import { Button } from "./ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import { Check, Copy } from "lucide-react";

export function CopyToClipboard() {
  const { questionsDB } = useAppStore();
  const [copied, setCopied] = useState(false);

  function onCopy() {
    const jsonData = JSON.stringify(questionsDB, null, 2);

    navigator.clipboard.writeText(jsonData);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <Button type="button" onClick={onCopy} className="w-fit flex gap-2">
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span>{copied ? "Copied!" : "Copy"}</span>
    </Button>
  );
}
