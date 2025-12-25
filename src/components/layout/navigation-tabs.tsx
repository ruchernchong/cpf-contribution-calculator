"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "next";

const navigationItems = [
  { href: "/", label: "Income Ceiling" },
  { href: "/calculator", label: "Calculator" },
  { href: "/interest-rates", label: "Interest Rates" },
  { href: "/investments", label: "Investments" },
];

export function NavigationTabs() {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto">
      <Tabs value={pathname}>
        <TabsList>
          {navigationItems.map((item) => (
            <TabsTrigger key={item.href} value={item.href} asChild>
              <Link href={item.href as Route}>{item.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
