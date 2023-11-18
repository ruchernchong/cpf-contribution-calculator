import { PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren {
  href: string;
}

const Link = ({ href, children }: LinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="text-neutral-400 underline"
    >
      {children}
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-neutral-800 p-4">
      <div>
        Created by <Link href="https://ruchern.xyz">Ru Chern</Link>
      </div>
      <div>
        <Link href="https://github.com/ruchernchong/cpf-contribution-calculator">
          Source code
        </Link>{" "}
        on GitHub
      </div>
    </footer>
  );
};
