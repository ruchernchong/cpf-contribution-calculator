import { useEffect, useState } from "react";
import { CalculatedResult } from "./components/CalculatedResult";
import { DistributionComponent } from "./components/DistributionComponent";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { UserInput } from "./components/UserInput";
import { faqs } from "./config";
import { ageGroups, cpfIncomeCeilings } from "./data";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateCpfContribution } from "./lib/calculateCpfContribution";
import { convertBirthDateToAge } from "./lib/convertBirthDateToAge";
import { findAgeGroup } from "./lib/findAgeGroup";
import { findLatestIncomeCeilingDate } from "./lib/findLatestIncomeCeilingDate";
import { formatCurrency } from "./lib/format";
import type {
  AgeGroup,
  ContributionRate,
  ComputedResult,
  CPFIncomeCeiling,
  DistributionResult,
} from "./types";

const App = () => {
  useDarkMode();

  const latestIncomeCeiling = findLatestIncomeCeilingDate(cpfIncomeCeilings);
  const [currentYearIncomeCeiling, setCurrentYearIncomeCeiling] =
    useState<string>(latestIncomeCeiling);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(ageGroups[0]);
  const [contributionRate, setContributionRate] = useState<ContributionRate>(
    ageGroup.contributionRate
  );

  const [dataFromLocalStorage, setDataFromLocalStorage] = useLocalStorage(
    "data",
    {
      storeInput: false,
      monthlyGrossIncome: 0,
      birthDate: "",
    }
  );
  const [storeInputInLocalStorage, setStoreInputInLocalStorage] =
    useState<boolean>(dataFromLocalStorage.storeInput);
  const [monthlyGrossIncome, setMonthlyGrossIncome] = useState<number>(
    dataFromLocalStorage.monthlyGrossIncome
  );
  const [birthDate, setBirthDate] = useState<string>(
    dataFromLocalStorage.birthDate
  );

  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling>();
  const [selectedAge, setSelectedAge] = useState<number>(0);

  useEffect(() => {
    setDataFromLocalStorage({
      storeInput: storeInputInLocalStorage,
      monthlyGrossIncome,
      birthDate,
    });
  }, [birthDate, monthlyGrossIncome, storeInputInLocalStorage]);

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

  useEffect(() => {
    if (selectedAge) {
      const ageGroup = findAgeGroup(selectedAge);
      setAgeGroup(ageGroup);
    }
  }, [selectedAge]);

  const contributionResult: ComputedResult = calculateCpfContribution(
    monthlyGrossIncome,
    currentYearIncomeCeiling,
    {
      ageGroup,
    }
  );

  const distributionResults: DistributionResult[] = Object.entries(
    contributionResult.distribution
  ).map(([name, value]) => ({ name, value }));

  const handleBirthDateChange = (e: { target: { value: string } }) => {
    const birthdate = e.target.value;
    const age = convertBirthDateToAge(birthdate);

    setBirthDate(birthdate);
    setSelectedAge(age);
  };

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
            <p className="text-4xl font-extrabold text-red-300">
              {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
            </p>
          )}
        </div>
        <div className="gap-x-4 md:flex">
          <UserInput
            birthDate={birthDate}
            monthlyGrossIncome={monthlyGrossIncome}
            currentYear={latestIncomeCeiling}
            storeInputInLocalStorage={storeInputInLocalStorage}
            onBirthDateChange={handleBirthDateChange}
            onStoreInputInLocalStorageChange={(e) =>
              setStoreInputInLocalStorage(e.target.checked)
            }
            onCurrentIncomeCeilingChange={(e) =>
              setCurrentYearIncomeCeiling(e.target.value)
            }
            onGrossIncomeChange={(e) => {
              setMonthlyGrossIncome(parseFloat(e.target.value) || 0);
            }}
          />
          <CalculatedResult
            result={contributionResult}
            contributionRate={contributionRate}
            monthlyGrossIncome={monthlyGrossIncome}
          />
        </div>
        {contributionResult.contribution.total > 0 && (
          <DistributionComponent distributionResults={distributionResults} />
        )}
        <FAQ items={faqs} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
