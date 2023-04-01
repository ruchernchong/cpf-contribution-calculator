import { useEffect, useState } from "react";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { SelectBox } from "./components/SelectBox";
import { getIncomeAfterCpf } from "./lib/getIncomeAfterCpf";
import { formatCurrency } from "./lib/formatCurrency";
import { ageGroups, Contribution, cpfIncomeCeilings } from "./data";
import { useDarkMode } from "./hooks/useDarkMode";

import { faqs } from "./config";
import { getEmployerContribution } from "./lib/getEmployerContribution";
import { getTotalCpfContribution } from "./lib/getTotalCpfContribution";
import { getEmployeeContribution } from "./lib/getEmployeeContribution";

const App = () => {
  useDarkMode();

  const currentYear = new Date().getFullYear().toString();

  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [ageGroupIndex, setAgeGroupIndex] = useState<number>(0);
  const [cpfContribution, setCpfContribution] = useState<Contribution>(
    ageGroups[ageGroupIndex].contribution
  );
  const [grossIncome, setGrossIncome] = useState<number>();

  useEffect(() => {
    setCpfContribution(ageGroups[ageGroupIndex].contribution);
  }, [ageGroupIndex]);

  const incomeCeilingOnSelectedYear = cpfIncomeCeilings.find(
    ({ year }) => year === selectedYear
  );

  let incomeAfterCpfBeforeSep2023,
    totalCpfContributionBeforeSep2023,
    incomeAfterCpf,
    employeeCpfContribution,
    employerCpfContribution,
    totalCpfContribution,
    incomeDifference,
    cpfContributionDifference;
  if (grossIncome) {
    incomeAfterCpfBeforeSep2023 = getIncomeAfterCpf(grossIncome, selectedYear, {
      employeeContribution: cpfContribution.employee,
      useCeilingBeforeChanges: true,
    });

    totalCpfContributionBeforeSep2023 = getTotalCpfContribution(
      grossIncome,
      selectedYear,
      cpfContribution,
      { useCeilingBeforeChanges: true }
    );

    incomeAfterCpf = getIncomeAfterCpf(grossIncome, selectedYear, {
      employeeContribution: cpfContribution.employee,
    });

    employeeCpfContribution = getEmployeeContribution(
      grossIncome,
      selectedYear,
      { employeeContribution: cpfContribution.employee }
    );

    employerCpfContribution = getEmployerContribution(
      grossIncome,
      selectedYear,
      {
        employerContribution: cpfContribution.employer,
      }
    );

    totalCpfContribution = getTotalCpfContribution(
      grossIncome,
      selectedYear,
      cpfContribution
    );

    if (selectedYear >= "SEP2023") {
      incomeDifference = incomeAfterCpf - incomeAfterCpfBeforeSep2023;
      cpfContributionDifference =
        totalCpfContribution - totalCpfContributionBeforeSep2023;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="prose mx-auto flex w-full max-w-6xl grow flex-col justify-center px-4 py-16 dark:prose-invert">
        <h1>CPF Calculator</h1>
        <SelectBox
          name="age-group"
          id="age-group"
          onChange={(e) => setAgeGroupIndex(Number(e.target.value))}
        >
          {ageGroups.map(({ description }, index) => {
            return (
              <option key={index} value={index}>
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
          {incomeAfterCpfBeforeSep2023 &&
            totalCpfContributionBeforeSep2023 &&
            incomeAfterCpf &&
            employeeCpfContribution &&
            employerCpfContribution &&
            totalCpfContribution && (
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
                        }).format(
                          incomeDifference / incomeAfterCpfBeforeSep2023
                        )}
                        )
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-xl text-green-600 md:text-2xl">
                  <div>
                    Employee's contribution (
                    {new Intl.NumberFormat("en-SG", {
                      style: "percent",
                    }).format(cpfContribution.employee)}
                    )
                  </div>
                  <div>{formatCurrency(employeeCpfContribution)}</div>
                </div>
                <div className="flex justify-between text-xl text-green-600 md:text-2xl">
                  <div>
                    Employer's contribution (
                    {new Intl.NumberFormat("en-SG", {
                      style: "percent",
                    }).format(cpfContribution.employer)}
                    )
                  </div>
                  <div>{formatCurrency(employerCpfContribution)}</div>
                </div>
                <div className="flex justify-between text-xl text-blue-500 md:text-2xl">
                  <div>Total CPF contribution</div>
                  <div>{formatCurrency(totalCpfContribution)}</div>
                </div>
                <div>
                  {!!cpfContributionDifference && (
                    <div className="flex justify-between text-xl md:text-2xl">
                      <div>Before September 2023</div>
                      <div className="flex flex-col items-end">
                        {formatCurrency(totalCpfContributionBeforeSep2023)}
                        <span className="text-sm italic text-green-600">
                          ({formatCurrency(cpfContributionDifference)} /{" "}
                          {new Intl.NumberFormat("en-SG", {
                            style: "percent",
                          }).format(
                            cpfContributionDifference /
                              totalCpfContributionBeforeSep2023
                          )}
                          )
                        </span>
                      </div>
                    </div>
                  )}
                </div>
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
