"use client";

import { useCharactersQuery, CharacterStatus, CharacterGender } from "@/generated/graphql";
import { useQueryState, parseAsStringEnum, parseAsString } from "nuqs";
import Image from "next/image";

const statusOptions = [
  CharacterStatus.Alive,
  CharacterStatus.Dead,
  CharacterStatus.Unknown,
] as const;

const genderOptions = [
  CharacterGender.Male,
  CharacterGender.Female,
  CharacterGender.Unknown,
] as const;

function labelStatus(s: CharacterStatus) {
  switch (s) {
    case CharacterStatus.Alive:
      return "Alive";
    case CharacterStatus.Dead:
      return "Dead";
    default:
      return "Unknown";
  }
}

function labelGender(g: CharacterGender) {
  switch (g) {
    case CharacterGender.Male:
      return "Male";
    case CharacterGender.Female:
      return "Female";
    default:
      return "Unknown";
  }
}

function pillClass(kind: "status" | "gender", value: string) {
  if (kind === "status") {
    if (value === CharacterStatus.Alive)
      return "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25";
    if (value === CharacterStatus.Dead)
      return "bg-rose-500/15 text-rose-300 ring-rose-500/25";
    return "bg-zinc-500/15 text-zinc-300 ring-zinc-500/25";
  }
  return "bg-indigo-500/15 text-indigo-200 ring-indigo-500/25";
}

export function CharacterCatalog() {
  const statusParser = parseAsStringEnum(
    Object.values(CharacterStatus) as [CharacterStatus, ...CharacterStatus[]],
  );
  const genderParser = parseAsStringEnum(
    Object.values(CharacterGender) as [CharacterGender, ...CharacterGender[]],
  );

  const [status, setStatus] = useQueryState("status", statusParser);
  const [gender, setGender] = useQueryState("gender", genderParser);
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ throttleMs: 350 }),
  );

  const filter = {
    ...(status ? { status } : {}),
    ...(gender ? { gender } : {}),
    ...(search.trim() ? { search: search.trim() } : {}),
  };

  const hasFilter = Object.keys(filter).length > 0;

  const query = useCharactersQuery(
    hasFilter ? { filter } : {},
    {
      queryKey: hasFilter ? ["Characters", { filter }] : ["Characters"],
    },
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Characters
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
          Filter and search are driven by the GraphQL API. URL query parameters
          stay in sync via nuqs.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-xl backdrop-blur sm:flex-row sm:flex-wrap sm:items-end">
        <label className="flex min-w-[160px] flex-1 flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-300">Status</span>
          <select
            value={status ?? ""}
            onChange={(e) => {
              const v = e.target.value as CharacterStatus | "";
              void setStatus(v || null);
            }}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="">All statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {labelStatus(s)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-[160px] flex-1 flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-300">Gender</span>
          <select
            value={gender ?? ""}
            onChange={(e) => {
              const v = e.target.value as CharacterGender | "";
              void setGender(v || null);
            }}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="">All genders</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {labelGender(g)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-[200px] flex-[2] flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-300">Search name or description</span>
          <input
            type="search"
            value={search}
            onChange={(e) => void setSearch(e.target.value || "")}
            placeholder="Try “scientist”, “Beth”, or “dimension”…"
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />
        </label>
      </section>

      {query.isLoading ? (
        <p className="text-sm text-zinc-500">Loading characters…</p>
      ) : query.isError ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          {(query.error as Error)?.message ||
            "Something went wrong. Is the API running on NEXT_PUBLIC_GRAPHQL_URL?"}
        </div>
      ) : !query.data?.characters.length ? (
        <p className="text-sm text-zinc-500">No characters match these filters.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {query.data.characters.map((c, index) => (
            <li
              key={c.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-lg transition hover:border-zinc-700 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full bg-zinc-800">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  unoptimized
                  priority={index === 0}
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <h2 className="text-lg font-semibold text-white">{c.name}</h2>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${pillClass("status", c.status)}`}
                  >
                    {labelStatus(c.status)}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${pillClass("gender", c.gender)}`}
                  >
                    {labelGender(c.gender)}
                  </span>
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">
                  {c.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
