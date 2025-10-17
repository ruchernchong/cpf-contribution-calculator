import { CodeIcon, HomeIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

const Header = () => (
  <header className="z-10 w-full border-zinc-200 border-b bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
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
              className="flex items-center rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <InfoIcon className="mr-2 h-4 w-4" />
              About
            </Link>
            <Link
              href="/api"
              className="flex items-center rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <CodeIcon className="mr-2 h-4 w-4" />
              API
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;
