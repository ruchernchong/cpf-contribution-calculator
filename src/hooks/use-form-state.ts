import type { PrimitiveAtom } from "jotai";
import { useAtom } from "jotai";
import { useCallback, useTransition } from "react";

interface FormState<T> {
  data: T;
  isPending: boolean;
}

export const useFormState = <T>(
  atom: PrimitiveAtom<T>,
): FormState<T> & { update: (fn: (prev: T) => T) => void } => {
  const [data, setData] = useAtom(atom);
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    (fn: (prev: T) => T) => {
      startTransition(() => {
        setData(fn);
      });
    },
    [setData],
  );

  return {
    data,
    isPending,
    update,
  };
};
