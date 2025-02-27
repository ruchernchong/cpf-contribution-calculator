import { settingsAtom } from "@/atoms/settingAtom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatDateInput, isValidDateFormat } from "@/utils/date-utils";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import React, { type ChangeEvent, useCallback, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";

const UserInput = () => {
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
    [birthDate, setSettings],
  );

  const handleReset = () => {
    resetSettings();
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Enter your details for CPF calculation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Birth Date Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="birthDate">Birth month and year</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <QuestionMarkCircleIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Your birth date affects your contribution rates
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="text"
            id="birthDate"
            name="dateOfBirth"
            placeholder="MM/YYYY"
            maxLength={7}
            value={birthDate}
            onChange={handleBirthDateChange}
            className={
              !isValidDateFormat(birthDate) && birthDate
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {!isValidDateFormat(birthDate) && birthDate && (
            <p className="text-xs text-red-500">
              Please enter a valid date in MM/YYYY format
            </p>
          )}
        </div>
        {/* Gross Income Input */}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="grossIncome">Gross Monthly Income</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <QuestionMarkCircleIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Your total monthly salary before any deductions
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="grossIncome"
            type="number"
            placeholder="0.00"
            value={monthlyGrossIncome || ""}
            onChange={(e) =>
              setSettings((setting) => ({
                ...setting,
                monthlyGrossIncome: Number.parseFloat(e.target.value) || 0,
              }))
            }
            className="max-w-xs"
            min={0}
          />
          {/* Remember Input Checkbox */}
        </div>

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
          <Label htmlFor="remember" className="text-sm">
            Store input on this browser?
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          By ticking the above checkbox, the input will be stored on your own
          browser. No data are being stored on any servers.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserInput;
