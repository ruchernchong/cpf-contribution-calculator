import { latestIncomeCeilingDateAtom } from "@/atoms/incomeCeilingAtom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CPF_INCOME_CEILING } from "@/constants";
import { formatCurrency } from "@/lib/format";
import { useAtom } from "jotai";
import React, { useState } from "react";

const CPFYearSlider = () => {
  const [latestIncomeCeilingDate, setLatestIncomeCeilingDate] = useAtom(
    latestIncomeCeilingDateAtom,
  );

  const [sliderValue, setSliderValue] = useState(latestIncomeCeilingDate);

  const dateKeys = Object.keys(CPF_INCOME_CEILING);

  return (
    <Card className="mb-4 w-full">
      <CardHeader>
        <CardTitle className="text-lg">CPF Income Ceiling by Year</CardTitle>
        <CardDescription>
          Compare income ceilings across different dates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Date</Label>
            <div className="pt-4">
              <Slider
                value={[dateKeys.indexOf(sliderValue)]}
                onValueChange={(value) => {
                  const selectedDate = dateKeys[value[0]];
                  setSliderValue(selectedDate);
                  setLatestIncomeCeilingDate(selectedDate);
                }}
                min={0}
                max={dateKeys.length - 1}
                step={1}
              />
            </div>
            <div className="flex justify-between px-2 text-sm text-gray-500">
              {dateKeys.map((date) => (
                <div key={date} className="text-center">
                  <div>{date}</div>
                  <div>{formatCurrency(CPF_INCOME_CEILING[date])}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CPFYearSlider;
