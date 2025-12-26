import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { source } from "@/app/(docs)/lib/source";

export default function DeveloperLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <RootProvider theme={{ defaultTheme: "light" }}>
      <DocsLayout tree={source.pageTree} nav={{ title: "API Documentation" }}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
