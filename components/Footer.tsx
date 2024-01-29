import type { PropsWithChildren } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface LinkProps extends PropsWithChildren {
  href: string;
}

const Link = ({ href, children }: LinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="flex items-center gap-x-1 text-gray-900 hover:underline hover:underline-offset-8"
    >
      {children}
      <ArrowTopRightOnSquareIcon width={16} height={16} />
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className="flex justify-center gap-x-4 bg-gray-100 px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-y-4">
        <div className="flex gap-x-4">
          <Link href="https://ruchern.xyz">
            <span>Chong Ru Chern</span>
          </Link>
          <Link href="https://github.com/ruchernchong/cpf-contribution-calculator">
            <span>Source code</span>
          </Link>
        </div>
        <div>&copy; {new Date().getFullYear()}. All Rights Reserved.</div>
      </div>
    </footer>
  );
};
