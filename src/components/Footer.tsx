export const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-neutral-100 p-4 dark:bg-neutral-800">
      <div>
        Created by{" "}
        <a
          href="https://ruchern.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 underline"
        >
          Chong Ru Chern
        </a>
      </div>
      <div>
        <a
          href="https://github.com/ruchernchong/cpf-calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 underline"
        >
          Source code
        </a>{" "}
        on GitHub
      </div>
    </footer>
  );
};
