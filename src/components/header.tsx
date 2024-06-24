import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/hooks/use-app-store";

export function Header() {
  const { query, setQuery, resetQuery } = useAppStore();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <header className="sticky top-0 flex h-16 justify-center items-center gap-4 border-b bg-background px-4 z-10">
      <div className="relative w-full md:w-auto">
        <Search
          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          onClick={resetQuery}
        />
        <Input
          ref={searchRef}
          id="search-input"
          type="search"
          placeholder="Search questions..."
          className="pl-8 w-full md:w-[500px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </header>
  );
}
