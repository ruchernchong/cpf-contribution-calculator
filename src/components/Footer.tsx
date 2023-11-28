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
      className="text-gray-900 underline dark:text-gray-50"
    >
      {children}
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-gray-200 p-4 dark:bg-gray-800">
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
