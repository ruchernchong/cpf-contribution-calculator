import React, { useCallback } from "react";
import { useAtom } from "jotai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { userInputAtom, resetUserInputAtom } from "@/atoms/userInputAtom";
import { formatDateInput, isValidDateFormat } from "@/utils/date-utils";
import { formatDate } from "@/lib/format";

export const UserInput = () => {
  const [userInput, setUserInput] = useAtom(userInputAtom);
  const [, resetUserInput] = useAtom(resetUserInputAtom);

  const handleBirthDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = event.target.value;
      const formattedBirthDate = formatDateInput(rawInput, userInput.birthDate);

      setUserInput(prev => ({
        ...prev,
        birthDate: formattedBirthDate
      }));
    },
    [userInput.birthDate, setUserInput]
  );

  const handleIncomeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const income = parseFloat(event.target.value) || 0;

      setUserInput(prev => ({
        ...prev,
        monthlyGrossIncome: income
      }));
    },
    [setUserInput]
  );

  const handleStoreInputToggle = useCallback(
    (checked: boolean) => {
      setUserInput(prev => ({
        ...prev,
        shouldStoreInput: checked
      }));
    },
    [setUserInput]
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
            id="birthDate"
            placeholder="MM/YYYY"
            value={userInput.birthDate}
            onChange={handleBirthDateChange}
            className="max-w-xs"
            maxLength={7}
          />
          {!isValidDateFormat(userInput.birthDate) && userInput.birthDate && (
            <p className="text-xs text-red-500">
              Please enter a valid date in MM/YYYY format
            </p>
          )}
        </div>

        {/* Effective Date Select */}
        <div className="space-y-2">
          <Label htmlFor="effectiveDate">
            CPF Income Ceiling Effective Date
          </Label>
          <Select 
            value={userInput.effectiveDate}
            onValueChange={(value) => setUserInput(prev => ({
              ...prev,
              effectiveDate: value
            }))}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01 January 2025">
                {formatDate(new Date("2025-01-01"))}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gross Income Input */}
        <div className="space-y-2">
          <Label htmlFor="grossIncome">Gross Income</Label>
          <Input
            id="grossIncome"
            type="number"
            placeholder="0.00"
            value={userInput.monthlyGrossIncome || ''}
            onChange={handleIncomeChange}
            className="max-w-xs"
            min={0}
          />
        </div>

        {/* Remember Input Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember"
            checked={userInput.shouldStoreInput}
            onCheckedChange={handleStoreInputToggle}
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
