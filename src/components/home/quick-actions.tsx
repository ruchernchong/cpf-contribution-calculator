import {
  Calculator01Icon,
  ChartLineData01Icon,
  MoneyBag01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    title: "Calculator",
    description: "Calculate your employee and employer CPF contributions",
    href: "/calculator" as const,
    icon: Calculator01Icon as IconSvgElement,
  },
  {
    title: "Interest Rates",
    description: "View current OA, SA, and MA interest rates",
    href: "/interest-rates" as const,
    icon: ChartLineData01Icon as IconSvgElement,
  },
  {
    title: "Investments",
    description: "Compare CPF returns with other investment options",
    href: "/investments" as const,
    icon: MoneyBag01Icon as IconSvgElement,
  },
];

const QuickActions = () => {
  return (
    <section>
      <h2 className="mb-4 font-semibold text-lg text-muted-foreground">
        Explore
      </h2>
      <div className="grid gap-4">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className="group">
            <Card className="h-full shadow-sm transition-all hover:border-accent/30 hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-2 flex items-center gap-4">
                  <div className="rounded-lg bg-accent/10 p-2">
                    <HugeiconsIcon
                      icon={action.icon}
                      className="size-5 text-accent"
                      strokeWidth={2}
                    />
                  </div>
                  <CardTitle className="text-base transition-colors group-hover:text-accent">
                    {action.title}
                  </CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
