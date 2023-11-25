import { useEffect, useState } from "react";
import { CalculatedResult } from "./components/CalculatedResult";
import { DistributionPieChart } from "./components/DistributionPieChart";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { UserInput } from "./components/UserInput";
import { faqs } from "./config";
import { ageGroups, cpfIncomeCeilings } from "./data";
import { useDarkMode } from "./hooks/useDarkMode";
import { calculateCpfContribution } from "./lib/calculateCpfContribution";
import { findAgeGroup } from "./lib/findAgeGroup";
import { formatCurrency } from "./lib/format";
import type {
  AgeGroup,
  ContributionRate,
  ContributionResult,
  CPFIncomeCeiling,
} from "./types";
import { convertBirthDateToAge } from "./lib/convertBirthDateToAge";
import { closestTo, format, isPast, max, parse } from "date-fns";

const App = () => {
  useDarkMode();

  const parsedData = cpfIncomeCeilings.map(({ effectiveDate, ceiling }) => ({
    date: parse(effectiveDate, "MM-yyyy", new Date()),
    ceiling,
  }));
  const currentDate = new Date();
  const pastDates = parsedData.filter(({ date }) => date < currentDate);
  const closestPastDate = closestTo(
    currentDate,
    pastDates.map(({ date }) => date)
  ) as Date;
  const formattedClosestPastDate = format(closestPastDate, "MM-yyyy");

  const [currentYearIncomeCeiling, setCurrentYearIncomeCeiling] =
    useState<string>(formattedClosestPastDate);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(ageGroups[0]);
  const [contributionRate, setContributionRate] = useState<ContributionRate>(
    ageGroup.contributionRate
  );

  const dataFromLocalStorage = JSON.parse(localStorage.getItem("data") || "{}");
  const [grossIncome, setGrossIncome] = useState<number>(
    dataFromLocalStorage.grossIncome || 0
  );
  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling>();
  const [storeInputInLocalStorage, setStoreInputInLocalStorage] =
    useState<boolean>(dataFromLocalStorage.storeInput || false);
  const [birthDate, setBirthDate] = useState<string>(
    dataFromLocalStorage.birthDate || ""
  );
  const [selectedAge, setSelectedAge] = useState<number>();

  useEffect(() => {
    const incomeCeilingOnSelectedYear = cpfIncomeCeilings.find(
      ({ effectiveDate }) => effectiveDate === currentYearIncomeCeiling
    );
    setIncomeCeilingOnSelectedYear(incomeCeilingOnSelectedYear);
  }, [currentYearIncomeCeiling]);

  useEffect(() => {
    if (ageGroup) {
      setContributionRate(ageGroup.contributionRate);
    }
  }, [ageGroup]);

  useEffect(() => {
    const age = convertBirthDateToAge(birthDate);
    setSelectedAge(age);
  }, [birthDate]);

  const contributionResult = calculateCpfContribution(
    grossIncome,
    currentYearIncomeCeiling,
    {
      ageGroup,
    }
  );

  const distributionRate = Object.entries(contributionResult.distribution).map(
    ([name, value]) => ({ name, value })
  );

  useEffect(() => {
    const dataToStore = {
      storeInput: storeInputInLocalStorage,
      grossIncome,
      birthDate,
    };

    if (storeInputInLocalStorage) {
      localStorage.setItem("data", JSON.stringify(dataToStore));
    } else {
      localStorage.removeItem("data");
    }
  }, [birthDate, grossIncome, storeInputInLocalStorage]);

  const handleBirthDateChange = (e: { target: { value: string } }) => {
    const birthdate = e.target.value;
    const age = convertBirthDateToAge(birthdate);

    setBirthDate(birthdate);
    setSelectedAge(age);
  };

  useEffect(() => {
    if (selectedAge) {
      const ageGroup = findAgeGroup(selectedAge) as AgeGroup;
      setAgeGroup(ageGroup);
    }
  }, [selectedAge]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="prose prose-invert mx-auto flex w-full max-w-6xl grow flex-col px-4 py-16 md:px-8">
        <div className="text-center">
          <h1>CPF Contribution Calculator</h1>
          <h2>
            A calculator to compute CPF contributions after the 2023 income
            ceiling changes following Ministry of Finance announcement at the
            Singapore Budget 2023
          </h2>
          <h3>Current CPF Income Ceiling</h3>
          {incomeCeilingOnSelectedYear && (
            <p className="text-2xl text-red-300">
              {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
            </p>
          )}
        </div>
        <div className="gap-x-4 md:flex">
          <UserInput
            birthDate={birthDate}
            grossIncome={grossIncome}
            currentYear={formattedClosestPastDate}
            storeInputInLocalStorage={storeInputInLocalStorage}
            onBirthDateChange={handleBirthDateChange}
            onStoreInputInLocalStorageChange={(e) =>
              setStoreInputInLocalStorage(e.target.checked)
            }
            onCurrentIncomeCeilingChange={(e) =>
              setCurrentYearIncomeCeiling(e.target.value)
            }
            onGrossIncomeChange={(e) =>
              setGrossIncome(parseInt(e.target.value))
            }
          />
          <CalculatedResult
            result={contributionResult}
            contributionRate={contributionRate}
            grossIncome={grossIncome}
          />
        </div>
        <DistributionPieChart data={distributionRate} />
        <FAQ items={faqs} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
