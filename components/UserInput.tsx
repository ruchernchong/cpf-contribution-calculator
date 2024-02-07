import { type ChangeEvent, useCallback, useEffect } from "react";
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
import {
  resetSetting,
  updateSetting,
} from "../lib/features/setting/settingSlice";
import { convertBirthDateToAge } from "../lib/convertBirthDateToAge";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { updateIncomeCeiling } from "../lib/features/incomeCeiling/incomeCeilingSlice";
import { updateUserInfo } from "../lib/features/userInfo/userInfoSlice";
import { formatDateInput } from "../utils/formatDateInput";
import { findAgeGroup } from "../lib/findAgeGroup";

export const UserInput = () => {
  const dispatch = useAppDispatch();
  const { latestIncomeCeilingDate } = useAppSelector(
    ({ incomeCeiling }) => incomeCeiling
  );
  const { birthDate, monthlyGrossIncome, shouldStoreInput } = useAppSelector(
    ({ setting }) => setting
  );
  const { age } = useAppSelector(({ userInfo }) => userInfo);

  useEffect(() => {
    if (!shouldStoreInput) {
      dispatch(resetSetting());
    }
  }, [dispatch, shouldStoreInput]);

  const handleBirthDateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const rawInput = event.target.value;
      const formattedBirthDate = formatDateInput(rawInput, birthDate);
      const age = convertBirthDateToAge(formattedBirthDate);
      dispatch(updateUserInfo({ age }));
      dispatch(updateSetting({ birthDate: formattedBirthDate }));
    },
    [birthDate, dispatch]
  );

  useEffect(() => {
    const ageGroup = findAgeGroup(age);
    dispatch(updateUserInfo({ ageGroup }));
  }, [age, dispatch]);

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
        onValueChange={(value) =>
          dispatch(updateIncomeCeiling({ latestIncomeCeilingDate: value }))
        }
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
          dispatch(
            updateSetting({ monthlyGrossIncome: parseFloat(e.target.value) })
          )
        }
      />
      <div className="flex items-start gap-x-2">
        <Checkbox
          id="shouldStoreInput"
          checked={shouldStoreInput}
          onCheckedChange={(checked) =>
            dispatch(updateSetting({ shouldStoreInput: checked }))
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
