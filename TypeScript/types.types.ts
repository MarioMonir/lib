export interface Person {
  readonly id: string;
  name: string;
  age: number;
  email?: string;
}

export type PersonPick = Pick<Person, "name" | "age">;
// { name: string; age: number }

export type PersonOmit = Omit<Person, "id" | "email">;
// { name: string; age: number }

export type PersonPartial = Partial<Person>;
// Every key optional, including readonly modifiers preserved per key

export type PersonReadonly = Readonly<Person>;
// All keys readonly

/** Strip `readonly` from every property (mapped type modifier `-readonly`). */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type PersonMutable = Mutable<PersonReadonly>;
// Same keys as Person but none are readonly

// --- Union filtering: Exclude / Extract ---

export type Status = "idle" | "loading" | "success" | "error";

export type NonErrorStatus = Exclude<Status, "error">;
// "idle" | "loading" | "success"

export type LoadingOrError = Extract<Status, "loading" | "error" | "other">;
// "loading" | "error"

// --- Function introspection: Parameters / ReturnType ---

export function createUser(
  name: string,
  age: number,
  active = true,
): { id: string } {
  return { id: crypto.randomUUID() };
}

export type CreateUserArgs = Parameters<typeof createUser>;
// [name: string, age: number, active?: boolean]

export type CreateUserResult = ReturnType<typeof createUser>;
// { id: string }

// --- Null / undefined: NonNullable ---

export type MaybeName = string | null | undefined;
export type DefiniteName = NonNullable<MaybeName>;
// string

// --- Promises: Promise, Awaited ---

export type UserPromise = Promise<Person>;

/** One level of unwrapping (TS 4.5+). */
export type ResolvedUser = Awaited<UserPromise>;
// Person

/** Nested promises flatten with `Awaited`. */
export type Nested = Awaited<Promise<Promise<string>>>;
// string

async function fetchId(): Promise<string> {
  return "1";
}

export type FetchIdResult = Awaited<ReturnType<typeof fetchId>>;
// string
