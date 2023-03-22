import { useState } from "react";
import { SelectBox } from "./components/SelectBox";
import { getIncomeAfterCpf } from "./lib/getIncomeAfterCpf";
import { formatCurrency } from "./lib/formatCurrency";
import { ageGroups, cpfIncomeCeilings } from "./data";
import { DEFAULT_EMPLOYEE_CONTRIBUTION } from "./config";
import { useDarkMode } from "./hooks/useDarkMode";

const App = () => {
  useDarkMode();

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
    <div className="flex min-h-screen flex-col">
      <div className="prose mx-auto flex max-w-4xl grow flex-col items-center justify-center px-4 text-center dark:prose-invert">
        <h1>CPF Calculator</h1>
        <p className="text-left md:text-xl">
          Following the recent announcement from the Ministry of Finance during
          the Budget 2023 on 14 February 2023, the income ceiling will be raised
          from $6000 to $8000 by September 2026.
        </p>
        <SelectBox
          name="age-group"
          id="age-group"
          defaultValue={DEFAULT_EMPLOYEE_CONTRIBUTION}
          onChange={(e) => setEmployeeContribution(Number(e.target.value))}
        >
          {ageGroups.map(({ description, contribution }) => {
            return (
              <option key={contribution} value={contribution}>
                {description}
              </option>
            );
          })}
        </SelectBox>
        <SelectBox
          name="cpf-income-ceiling"
          id="cpf-income-ceiling"
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
        </SelectBox>
        <input
          type="number"
          pattern="\d"
          placeholder="Gross Income e.g. 10000"
          className="mb-2 w-full rounded-lg p-2 shadow-md shadow-neutral-200 dark:text-neutral-900 dark:shadow-none md:w-1/3"
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
    </div>
  );
};

export default App;
