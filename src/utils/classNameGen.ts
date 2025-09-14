import { HTMLAttributes } from "react";

export type TClassNameGen = string | number | boolean | null | undefined | unknown;
export function classNameGen<T, C>(...props: T[]): HTMLAttributes<C>["className"] {
  return props
    .flat()
    .filter((x) => typeof x === "string" && x.trim())
    .join(" ");
}
