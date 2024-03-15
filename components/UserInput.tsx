import { type ChangeEvent, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { latestIncomeCeilingDateAtom } from "../atoms/incomeCeilingAtom";
import { settingsAtom } from "../atoms/settingAtom";
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
import { formatDateInput } from "../utils/formatDateInput";

export const UserInput = () => {
  const [latestIncomeCeilingDate, setLatestIncomeCeilingDate] = useAtom(
    latestIncomeCeilingDateAtom
  );
  const [settings, setSettings] = useAtom(settingsAtom);
  const { birthDate, monthlyGrossIncome, shouldStoreInput } = settings;

  const resetSettings = useResetAtom(settingsAtom);

  useEffect(() => {
    if (!shouldStoreInput) {
      resetSettings();
    }
  }, [resetSettings, shouldStoreInput]);

  const handleBirthDateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const rawInput = event.target.value;
      const formattedBirthDate = formatDateInput(rawInput, birthDate);

      void setSettings((setting) => ({
        ...setting,
        birthDate: formattedBirthDate,
      }));
    },
    [birthDate, setSettings]
  );

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
        onChange={handleBirthDateChange}
      />
      <Label htmlFor="effectiveDate">CPF Income Ceiling Effective Date</Label>
      <Select
        defaultValue={latestIncomeCeilingDate}
        onValueChange={(value) => setLatestIncomeCeilingDate(value)}
      >
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
          setSettings((setting) => ({
            ...setting,
            monthlyGrossIncome: parseFloat(e.target.value),
          }))
        }
      />
      <div className="flex items-start gap-x-2">
        <Checkbox
          id="shouldStoreInput"
          checked={shouldStoreInput}
          onCheckedChange={(checked) =>
            setSettings((setting) => ({
              ...setting,
              shouldStoreInput: Boolean(checked),
            }))
          }
        />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="shouldStoreInput">Store input on this browser?</label>
          <p className="text-xs italic text-red-600">
            By ticking the above checkbox, the input will be stored on your own
            browser. No data are being stored on any servers.
          </p>
        </div>
      </div>
    </div>
  );
};
