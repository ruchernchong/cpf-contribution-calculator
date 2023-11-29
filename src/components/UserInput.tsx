import { ChangeEvent } from "react";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";
import { formatDate } from "../lib/format";
import { cpfIncomeCeilings } from "../data";

type UserInputProps = {
  birthDate: string;
  monthlyGrossIncome: number;
  currentYear: string;
  storeInputInLocalStorage: boolean;
  onBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCurrentIncomeCeilingChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGrossIncomeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onStoreInputInLocalStorageChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UserInput = ({
  birthDate,
  monthlyGrossIncome,
  currentYear,
  storeInputInLocalStorage,
  onBirthDateChange,
  onCurrentIncomeCeilingChange,
  onGrossIncomeChange,
  onStoreInputInLocalStorageChange,
}: UserInputProps) => {
  return (
    <div className="flex flex-col gap-y-2 dark:text-gray-50 md:w-1/3">
      <InputField
        type="text"
        name="dateOfBirth"
        id="dateOfBirth"
        placeholder="e.g. MM/YYYY"
        maxLength={7}
        labelText="Birth month and year"
        defaultValue={birthDate}
        onChange={onBirthDateChange}
      />
      <SelectBox
        name="cpf-income-ceiling"
        id="cpf-income-ceiling"
        labelText="CPF Income Ceiling Effective Date"
        defaultValue={currentYear}
        onChange={onCurrentIncomeCeilingChange}
      >
        {cpfIncomeCeilings.map(({ effectiveDate }) => {
          return (
            <option key={effectiveDate} value={effectiveDate}>
              {formatDate(effectiveDate, {
                inputFormat: "MM-yyyy",
                outputFormat: "dd MMMM yyyy",
              })}
            </option>
          );
        })}
      </SelectBox>
      <InputField
        type="number"
        name="gross-income"
        id="gross-income"
        inputMode="decimal"
        pattern="\d*"
        placeholder="e.g. 10000"
        labelText="Gross Income"
        defaultValue={monthlyGrossIncome}
        onChange={onGrossIncomeChange}
      />
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          id="store-data"
          defaultChecked={storeInputInLocalStorage}
          onChange={onStoreInputInLocalStorageChange}
        />
        <label htmlFor="store-data">Store input on this browser?</label>
      </div>
      <div className="mb-4 text-xs italic text-red-600 dark:text-red-300 ">
        By ticking the above checkbox, the input will be stored on your own
        browser. No data are being stored on any servers.
      </div>
    </div>
  );
};
