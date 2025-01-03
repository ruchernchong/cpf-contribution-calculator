import React from 'react';
import { useAtom } from 'jotai';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { birthDateAtom, effectiveDateAtom, grossIncomeAtom } from '@/atoms/userInputAtom';
import { formatDate } from '@/lib/format';

export const UserInput = () => {
  const [birthDate, setBirthDate] = useAtom(birthDateAtom);
  const [effectiveDate, setEffectiveDate] = useAtom(effectiveDateAtom);
  const [grossIncome, setGrossIncome] = useAtom(grossIncomeAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Enter your details for CPF calculation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Birth Date Input */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth month and year</Label>
          <Input
            id="birthDate"
            placeholder="MM/YYYY"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="max-w-xs"
          />
        </div>

        {/* Effective Date Select */}
        <div className="space-y-2">
          <Label htmlFor="effectiveDate">CPF Income Ceiling Effective Date</Label>
          <Select
            value={effectiveDate}
            onValueChange={setEffectiveDate}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01 January 2025">
                {formatDate(new Date('2025-01-01'))}
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
            value={grossIncome || ''}
            onChange={(e) => setGrossIncome(parseFloat(e.target.value) || 0)}
            className="max-w-xs"
          />
        </div>

        {/* Remember Input Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm text-gray-600">
            Store input on this browser?
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          By ticking the above checkbox, the input will be stored on your own browser. 
          No data are being stored on any servers.
        </p>
      </CardContent>
    </Card>
  );
};
