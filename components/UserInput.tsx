import { ChangeEvent } from "react";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";
import { formatDate } from "../lib/format";
import { cpfIncomeCeilings } from "../data";

type UserInputProps = {
  birthDate: string;
  monthlyGrossIncome: number;
  currentYear: string;
  shouldStoreInput: boolean;
  onBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEffectiveDateChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onGrossIncomeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onShouldStoreInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UserInput = ({
  birthDate,
  monthlyGrossIncome,
  currentYear,
  shouldStoreInput,
  onBirthDateChange,
  onEffectiveDateChange,
  onGrossIncomeChange,
  onShouldStoreInputChange,
}: UserInputProps) => {
  return (
    <div className="flex flex-col gap-y-4 md:w-1/3">
      <InputField
        type="text"
        name="dateOfBirth"
        id="dateOfBirth"
        placeholder="e.g. MM/YYYY"
        maxLength={7}
        labelText="Birth month and year"
        value={birthDate}
        onChange={onBirthDateChange}
      />
      <SelectBox
        name="effectiveDate"
        id="effectiveDate"
        labelText="CPF Income Ceiling Effective Date"
        defaultValue={currentYear}
        onChange={onEffectiveDateChange}
      >
        {cpfIncomeCeilings.map(({ effectiveDate }) => {
          return (
            <option key={effectiveDate} value={effectiveDate}>
              {formatDate(effectiveDate)}
            </option>
          );
        })}
      </SelectBox>
      <InputField
        type="number"
        name="grossIncome"
        id="grossIncome"
        inputMode="decimal"
        pattern="\d*"
        placeholder="e.g. 10000"
        labelText="Gross Income"
        defaultValue={monthlyGrossIncome}
        onChange={onGrossIncomeChange}
      />
      <label htmlFor="shouldStoreInput" className="flex items-center gap-x-2">
        <input
          type="checkbox"
          id="shouldStoreInput"
          checked={shouldStoreInput}
          className="rounded-lg text-gray-900 focus:ring-2 focus:ring-teal-600"
          onChange={onShouldStoreInputChange}
        />
        <span>Store input on this browser?</span>
      </label>
      <div className="text-xs italic text-red-600">
        By ticking the above checkbox, the input will be stored on your own
        browser. No data are being stored on any servers.
      </div>
    </div>
  );
};
