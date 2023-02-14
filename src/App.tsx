import { useEffect, useState } from "react";
import { getIncomeAfterCpf } from "./lib/getIncomeAfterCpf";
import { formatCurrency } from "./lib/formatCurrency";

const cpfIncomeCeilings: { year: number; month: number; ceiling: number }[] = [
  {
    year: 2023,
    month: 1,
    ceiling: 6000,
  },
  {
    year: 2023,
    month: 9,
    ceiling: 6300,
  },
  {
    year: 2024,
    month: 1,
    ceiling: 6800,
  },
  {
    year: 2025,
    month: 1,
    ceiling: 7400,
  },
  {
    year: 2026,
    month: 1,
    ceiling: 8000,
  },
];

const MONTH_NAME_MAPPING: Record<number, string> = {
  1: "January",
  9: "September",
};

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

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [selectedDate, setSelectedDate] = useState<{
    year: number;
    month: number;
  }>({
    year: currentYear,
    month: currentMonth,
  });
  const [grossIncome, setGrossIncome] = useState<number>();

  const handleSelectedDateChange = (e: { target: { value: string } }) => {
    const { year, month } = JSON.parse(e.target.value);
    setSelectedDate({ year, month });
  };

  const incomeCeilingOnSelectedDate = cpfIncomeCeilings.find(
    ({ year, month }) =>
      year === selectedDate.year && month === selectedDate.month
  );

  let incomeAfterCpfBeforeSep2023, incomeAfterCpf, incomeDifference;
  if (grossIncome) {
    incomeAfterCpfBeforeSep2023 = getIncomeAfterCpf(
      grossIncome,
      selectedDate.year,
      {
        useCeilingBeforeChanges: true,
      }
    );

    incomeAfterCpf = getIncomeAfterCpf(grossIncome, selectedDate.year);

    incomeDifference = incomeAfterCpf - incomeAfterCpfBeforeSep2023;
  }

  return (
    <div className="prose mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center text-center dark:prose-invert">
      <select
        name="cpf-income-ceiling"
        id="cpf-income-ceiling"
        className="mb-2 w-1/4 cursor-pointer rounded-lg p-2 dark:text-neutral-900"
        onChange={handleSelectedDateChange}
      >
        {cpfIncomeCeilings.map(({ year, month }) => {
          const value = JSON.stringify({ year, month });

          return (
            <option key={value} value={value}>
              {MONTH_NAME_MAPPING[month]} {year}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        pattern="\d"
        placeholder="Gross Income e.g. 10000"
        className="mb-8 w-1/4 rounded-lg p-2 dark:text-neutral-900"
        onChange={(e) => setGrossIncome(Number(e.target.value))}
      />
      {incomeCeilingOnSelectedDate && (
        <div className="mb-8 text-4xl">
          <div>
            {MONTH_NAME_MAPPING[incomeCeilingOnSelectedDate.month]}{" "}
            {incomeCeilingOnSelectedDate.year}:
          </div>
          <div>
            CPF income ceiling:{" "}
            {formatCurrency(incomeCeilingOnSelectedDate.ceiling)}
          </div>
        </div>
      )}
      {grossIncome && (
        <div className="mb-8 text-4xl">
          Gross income: {formatCurrency(grossIncome)}
        </div>
      )}
      {incomeAfterCpfBeforeSep2023 && incomeAfterCpf && incomeDifference && (
        <>
          <div className="mb-2 text-4xl">
            Income after CPF contribution: {formatCurrency(incomeAfterCpf)}
          </div>
          <div className="text-2xl">
            Before September 2023: {formatCurrency(incomeAfterCpfBeforeSep2023)}{" "}
            <span className="italic text-red-600">
              ({formatCurrency(incomeDifference)} /{" "}
              {new Intl.NumberFormat("en-SG", { style: "percent" }).format(
                incomeDifference / incomeAfterCpfBeforeSep2023
              )}
              )
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
