import { Suspense } from "react";
import { CharacterCatalog } from "./character-catalog";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-500">
          Loading…
        </div>
      }
    >
      <CharacterCatalog />
    </Suspense>
  );
}
