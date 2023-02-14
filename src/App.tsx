import { useState } from "react";
import "./App.css";
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
    <div className="App">
      <div>
        <select
          name="cpf-income-ceiling"
          id="cpf-income-ceiling"
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
      </div>
      <div>
        <input
          type="number"
          placeholder="10000"
          onChange={(e) => setGrossIncome(Number(e.target.value))}
        />
      </div>
      {incomeCeilingOnSelectedDate && (
        <h1>
          <div>
            {MONTH_NAME_MAPPING[incomeCeilingOnSelectedDate.month]}{" "}
            {incomeCeilingOnSelectedDate.year}:
          </div>
          <div>
            CPF income ceiling:{" "}
            {formatCurrency(incomeCeilingOnSelectedDate.ceiling)}
          </div>
        </h1>
      )}
      {grossIncome && <h1>Gross income: {formatCurrency(grossIncome)}</h1>}
      {incomeAfterCpfBeforeSep2023 && incomeAfterCpf && incomeDifference && (
        <>
          <h2>
            Income after CPF contribution: {formatCurrency(incomeAfterCpf)}
          </h2>
          <h3>
            Before September 2023: {formatCurrency(incomeAfterCpfBeforeSep2023)}{" "}
            <span style={{ color: "red" }}>
              ({formatCurrency(incomeDifference)} /{" "}
              {new Intl.NumberFormat("en-SG", { style: "percent" }).format(
                incomeDifference / incomeAfterCpfBeforeSep2023
              )}
              )
            </span>
          </h3>
        </>
      )}
    </div>
  );
};

export default App;
