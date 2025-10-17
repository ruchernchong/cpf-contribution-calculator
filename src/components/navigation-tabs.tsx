"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const navigationItems = [
  { href: "/", label: "Income Ceiling" },
  { href: "/calculator", label: "Calculator" },
  { href: "/interest-rates", label: "Interest Rates" },
  { href: "/investments", label: "Investments" },
];

export const NavigationTabs = () => {
  const pathname = usePathname();

  return (
    <Tabs value={pathname}>
      <TabsList>
        {navigationItems.map((item) => (
          <TabsTrigger key={item.href} value={item.href} asChild>
            <Link href={item.href}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
