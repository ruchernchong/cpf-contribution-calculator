import {
  CodeIcon,
  Home01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Route } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/50 border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-4">
              <Logo className="size-9 shadow-sm" />
              <span className="font-semibold text-foreground text-xl tracking-tight transition-colors group-hover:text-primary">
                SimplyCPF
              </span>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={Home01Icon}
                  className="size-4"
                  strokeWidth={2}
                />
                Home
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="size-4"
                  strokeWidth={2}
                />
                About
              </Link>
              <Link
                href={"/docs" as Route}
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={CodeIcon}
                  className="size-4"
                  strokeWidth={2}
                />
                Developer
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
