import React, { type ChangeEvent, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateInput, isValidDateFormat } from "@/utils/date-utils";
import { settingsAtom } from "@/atoms/settingAtom";
import { useResetAtom } from "jotai/utils";

export const UserInput = () => {
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
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Enter your details for CPF calculation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Birth Date Input */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth month and year</Label>
          <Input
            type="text"
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="MM/YYYY"
            maxLength={7}
            value={birthDate}
            onChange={handleBirthDateChange}
          />
          {!isValidDateFormat(birthDate) && birthDate && (
            <p className="text-xs text-red-500">
              Please enter a valid date in MM/YYYY format
            </p>
          )}
        </div>

        {/* Gross Income Input */}
        <div className="space-y-2">
          <Label htmlFor="grossIncome">Gross Income</Label>
          <Input
            id="grossIncome"
            type="number"
            placeholder="0.00"
            value={monthlyGrossIncome}
            onChange={(e) =>
              setSettings((setting) => ({
                ...setting,
                monthlyGrossIncome: parseFloat(e.target.value),
              }))
            }
            className="max-w-xs"
            min={0}
          />
        </div>

        {/* Remember Input Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={shouldStoreInput}
            onCheckedChange={(checked) =>
              setSettings((setting) => ({
                ...setting,
                shouldStoreInput: Boolean(checked),
              }))
            }
          />
          <Label htmlFor="remember" className="text-sm text-gray-600">
            Store input on this browser?
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          By ticking the above checkbox, the input will be stored on your own
          browser. No data are being stored on any servers.
        </p>
      </CardContent>
    </Card>
  );
};
