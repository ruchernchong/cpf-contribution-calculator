import { useState } from "react";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { SelectBox } from "./components/SelectBox";
import { getIncomeAfterCpf } from "./lib/getIncomeAfterCpf";
import { formatCurrency } from "./lib/formatCurrency";
import { ageGroups, cpfIncomeCeilings } from "./data";
import { DEFAULT_EMPLOYEE_CONTRIBUTION } from "./config";
import { useDarkMode } from "./hooks/useDarkMode";

import { faqs } from "./config";

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
      <div className="prose mx-auto flex w-full max-w-6xl grow flex-col justify-center px-4 py-16 dark:prose-invert">
        <h1>CPF Calculator</h1>
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
        <div className="mb-4 italic text-red-600">
          This is for illustration purposes only. No data are being stored.
        </div>
        <div className="flex flex-col gap-y-2">
          {incomeCeilingOnSelectedYear && (
            <div className="flex items-center justify-between text-xl md:text-2xl">
              <div>CPF Income Ceiling</div>
              <div className="flex flex-col items-end">
                {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
                <div className="text-sm">
                  {incomeCeilingOnSelectedYear.year === "SEPT2023" ? (
                    <div>September 2023</div>
                  ) : (
                    <div>January {incomeCeilingOnSelectedYear.year}</div>
                  )}
                </div>
              </div>
            </div>
          )}
          {grossIncome && (
            <div className="flex justify-between text-xl md:text-2xl">
              <div>Gross income</div>
              <div>{formatCurrency(grossIncome)}</div>
            </div>
          )}
          {incomeAfterCpfBeforeSep2023 && incomeAfterCpf && (
            <>
              <div className="flex justify-between text-xl md:text-2xl">
                <div>After CPF contribution</div>
                <div>{formatCurrency(incomeAfterCpf)}</div>
              </div>
              {!!incomeDifference && (
                <div className="flex justify-between text-xl md:text-2xl">
                  <div>Before September 2023</div>
                  <div className="flex flex-col items-end">
                    {formatCurrency(incomeAfterCpfBeforeSep2023)}
                    <span className="text-sm italic text-red-600">
                      ({formatCurrency(incomeDifference)} /{" "}
                      {new Intl.NumberFormat("en-SG", {
                        style: "percent",
                      }).format(incomeDifference / incomeAfterCpfBeforeSep2023)}
                      )
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <FAQ items={faqs} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
