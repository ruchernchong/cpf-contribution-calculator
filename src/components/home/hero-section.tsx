import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="text-center">
      <h1 className="mb-3 font-bold text-3xl text-foreground tracking-tight md:text-4xl">
        CPF Income Ceiling Changes
      </h1>
      <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
        Track how the 2023 Budget changes affect your CPF contributions as the
        ceiling rises from{" "}
        <span className="font-mono font-semibold text-accent">$6,000</span> to{" "}
        <span className="font-mono font-semibold text-accent">$8,000</span>
      </p>
      <Link
        href="/calculator"
        className={cn(buttonVariants({ size: "lg" }), "gap-2")}
      >
        Calculate Your Contributions
        <HugeiconsIcon icon={ArrowRight02Icon} className="size-4" />
      </Link>
    </section>
  );
};

export default HeroSection;
