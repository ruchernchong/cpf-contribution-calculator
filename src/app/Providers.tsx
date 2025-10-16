import { Provider } from "jotai";
import type { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};
