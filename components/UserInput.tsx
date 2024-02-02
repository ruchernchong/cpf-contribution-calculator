import { type ChangeEvent, useEffect } from "react";
import { formatDate } from "@/lib/format";
import { cpfIncomeCeilings } from "@/data";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { resetData, updateData } from "../lib/features/data/dataSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

type UserInputProps = {
  birthDate: string;
  currentYear: string;
  onBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEffectiveDateChange: (value: string) => void;
};

export const UserInput = ({
  birthDate,
  currentYear,
  onBirthDateChange,
  onEffectiveDateChange,
}: UserInputProps) => {
  const dispatch = useAppDispatch();

  const monthlyGrossIncome = useAppSelector(
    ({ data }) => data.monthlyGrossIncome
  );
  const shouldStoreInput = useAppSelector(({ data }) => data.shouldStoreInput);

  useEffect(() => {
    if (!shouldStoreInput) {
      dispatch(resetData());
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-4 md:w-1/3">
      <Label htmlFor="dateOfBirth">Birth month and year</Label>
      <Input
        type="text"
        name="dateOfBirth"
        id="dateOfBirth"
        placeholder="MM/YYYY"
        maxLength={7}
        value={birthDate}
        onChange={onBirthDateChange}
      />
      <Label htmlFor="effectiveDate">CPF Income Ceiling Effective Date</Label>
      <Select defaultValue={currentYear} onValueChange={onEffectiveDateChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select income ceiling effective date" />
        </SelectTrigger>
        <SelectContent>
          {cpfIncomeCeilings.map(({ effectiveDate }) => {
            return (
              <SelectItem key={effectiveDate} value={effectiveDate}>
                {formatDate(effectiveDate)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Label htmlFor="grossIncome">Gross Income</Label>
      <Input
        type="number"
        name="grossIncome"
        id="grossIncome"
        inputMode="decimal"
        pattern="\d*"
        placeholder="10000"
        value={monthlyGrossIncome}
        onChange={(e) =>
          dispatch(
            updateData({ monthlyGrossIncome: parseFloat(e.target.value) })
          )
        }
      />
      <div className="flex items-start gap-x-2">
        <Checkbox
          id="shouldStoreInput"
          checked={shouldStoreInput}
          onCheckedChange={(checked) =>
            dispatch(updateData({ shouldStoreInput: checked }))
          }
        />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="shouldStoreInput" className="">
            Store input on this browser?
          </label>
          <p className="text-xs italic text-red-600">
            By ticking the above checkbox, the input will be stored on your own
            browser. No data are being stored on any servers.
          </p>
        </div>
      </div>
    </div>
  );
};
