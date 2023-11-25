import { ChangeEvent } from "react";
import { SelectBox } from "./SelectBox";
import { cpfIncomeCeilings } from "../data";

type UserInputProps = {
  birthDate: string;
  grossIncome: number;
  currentYear: string;
  storeInputInLocalStorage: boolean;
  onBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCurrentIncomeCeilingChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGrossIncomeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onStoreInputInLocalStorageChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UserInput = ({
  birthDate,
  grossIncome,
  currentYear,
  storeInputInLocalStorage,
  onBirthDateChange,
  onCurrentIncomeCeilingChange,
  onGrossIncomeChange,
  onStoreInputInLocalStorageChange,
}: UserInputProps) => {
  return (
    <div className="flex flex-col gap-y-2 md:w-1/3">
      <input
        type="text"
        name="dateOfBirth"
        id="dateOfBirth"
        placeholder="MM/YYYY"
        className="rounded-lg p-2 text-neutral-900"
        maxLength={7}
        defaultValue={birthDate}
        onChange={onBirthDateChange}
      />
      <SelectBox
        name="cpf-income-ceiling"
        id="cpf-income-ceiling"
        defaultValue={currentYear}
        onChange={onCurrentIncomeCeilingChange}
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
        inputMode="decimal"
        pattern="\d*"
        placeholder="Gross Income e.g. 10000"
        className="rounded-lg p-2 text-neutral-900"
        defaultValue={grossIncome}
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
      <div className="mb-4 text-xs italic text-red-300">
        By ticking the above checkbox, the input will be stored on your own
        browser. No data are being stored on any servers.
      </div>
    </div>
  );
};
