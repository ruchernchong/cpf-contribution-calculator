"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: "Income Ceiling" },
  { href: "/calculator", label: "Calculator" },
  { href: "/interest-rates", label: "Interest Rates" },
  { href: "/investments", label: "Investments" },
];

export const PageNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="mb-8 w-full">
      <div className="inline-flex h-10 w-full items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              pathname === item.href
                ? "bg-background text-foreground shadow-sm"
                : "hover:bg-background/50"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
