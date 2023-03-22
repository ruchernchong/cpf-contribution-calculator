import { useEffect, useState } from "react";
import { getIncomeAfterCpf } from "lib/getIncomeAfterCpf";
import { formatCurrency } from "lib/formatCurrency";
import { DEFAULT_EMPLOYEE_CONTRIBUTION } from "config";

const ageGroups = [
  {
    description: "55 and below",
    min: 0,
    max: 55,
    contribution: DEFAULT_EMPLOYEE_CONTRIBUTION,
  },
  { description: "Above 55 to 60", min: 55, max: 60, contribution: 0.15 },
  { description: "Above 60 to 65", min: 60, max: 65, contribution: 0.095 },
  { description: "Above 65 to 70", min: 65, max: 70, contribution: 0.07 },
  { description: "Above 70", min: 70, contribution: 0.05 },
];

const cpfIncomeCeilings: {
  year: string;
  ceiling: number;
}[] = [
  {
    year: "2023",
    ceiling: 6000,
  },
  {
    year: "SEPT2023",
    ceiling: 6300,
  },
  {
    year: "2024",
    ceiling: 6800,
  },
  {
    year: "2025",
    ceiling: 7400,
  },
  {
    year: "2026",
    ceiling: 8000,
  },
];

const App = () => {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const currentYear = new Date().getFullYear().toString();

  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [employeeContribution, setEmployeeContribution] = useState<number>(
    DEFAULT_EMPLOYEE_CONTRIBUTION
  );
  const [grossIncome, setGrossIncome] = useState<number>();

  const incomeCeilingOnSelectedYear = cpfIncomeCeilings.find(
    ({ year }) => year === selectedYear
  );

  let incomeAfterCpfBeforeSep2023, incomeAfterCpf, incomeDifference;
  if (grossIncome) {
    incomeAfterCpfBeforeSep2023 = getIncomeAfterCpf(grossIncome, selectedYear, {
      employeeContribution,
      useCeilingBeforeChanges: true,
    });

    incomeAfterCpf = getIncomeAfterCpf(grossIncome, selectedYear, {
      employeeContribution,
    });

    if (selectedYear >= "2024") {
      incomeDifference = incomeAfterCpf - incomeAfterCpfBeforeSep2023;
    }
  }

  return (
    <>
      <div className="prose mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 text-center dark:prose-invert">
        <h1>CPF Calculator</h1>
        <p className="text-left md:text-xl">
          Following the recent announcement from the Ministry of Finance during
          the Budget 2023 on 14 February 2023, the income ceiling will be raised
          from $6000 to $8000 by September 2026.
        </p>
        <select
          name="age-group"
          id="age-group"
          className="mb-2 w-full cursor-pointer appearance-none rounded-lg p-2 dark:text-neutral-900 md:w-1/3"
          defaultValue={0.2}
          onChange={(e) => setEmployeeContribution(Number(e.target.value))}
        >
          {ageGroups.map(({ description, contribution }) => {
            return (
              <option key={contribution} value={contribution}>
                {description}
              </option>
            );
          })}
        </select>
        <select
          name="cpf-income-ceiling"
          id="cpf-income-ceiling"
          className="mb-2 w-full cursor-pointer appearance-none rounded-lg p-2 dark:text-neutral-900 md:w-1/3"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {cpfIncomeCeilings.map(({ year }) => {
            if (year === "SEPT2023") {
              return (
                <option key={year} value={year}>
                  September 2023
                </option>
              );
            }

            return (
              <option key={year} value={year}>
                January {year}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          pattern="\d"
          placeholder="Gross Income e.g. 10000"
          className="mb-2 w-full rounded-lg p-2 dark:text-neutral-900 md:w-1/3"
          onChange={(e) => setGrossIncome(Number(e.target.value))}
        />
        <div className="mb-8 italic text-red-600">
          This is for illustration purposes only. No data are being stored.
        </div>
        {incomeCeilingOnSelectedYear && (
          <div className="mb-8 text-2xl md:text-4xl">
            {incomeCeilingOnSelectedYear.year === "SEPT2023" ? (
              <div>September 2023:</div>
            ) : (
              <div>January {incomeCeilingOnSelectedYear.year}:</div>
            )}
            <div>
              CPF income ceiling:{" "}
              {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
            </div>
          </div>
        )}
        {grossIncome && (
          <div className="mb-8 text-2xl md:text-4xl">
            Gross income: {formatCurrency(grossIncome)}
          </div>
        )}
        {incomeAfterCpfBeforeSep2023 && incomeAfterCpf && (
          <>
            <div className="mb-2 text-2xl md:text-4xl">
              Income after CPF contribution: {formatCurrency(incomeAfterCpf)}
            </div>
            {!!incomeDifference && (
              <div className="text-2xl">
                Before September 2023:{" "}
                {formatCurrency(incomeAfterCpfBeforeSep2023)}{" "}
                <span className="italic text-red-600">
                  ({formatCurrency(incomeDifference)} /{" "}
                  {new Intl.NumberFormat("en-SG", { style: "percent" }).format(
                    incomeDifference / incomeAfterCpfBeforeSep2023
                  )}
                  )
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <footer className="flex flex-col items-center border-t p-4">
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
    </>
  );
};

export default App;
