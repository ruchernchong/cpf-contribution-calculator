import { Home01Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Header() {
  return (
    <header className="z-10 w-full border-border border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="mr-8 font-bold text-lg text-primary">
                CPF Calculator
              </span>
            </Link>
            <nav className="hidden space-x-1 md:flex">
              <Link
                href="/"
                className="flex items-center rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
              >
                <HugeiconsIcon
                  icon={Home01Icon}
                  className="mr-2 size-4"
                  strokeWidth={2}
                />
                Home
              </Link>
              <Link
                href="/about"
                className="flex items-center rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
              >
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="mr-2 size-4"
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
