import { Home01Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-3">
              {/* Logo mark - Gold C on navy */}
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <span className="font-bold text-lg">C</span>
              </div>
              {/* Brand name */}
              <span className="font-semibold text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
                CPF Calculator
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
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
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
