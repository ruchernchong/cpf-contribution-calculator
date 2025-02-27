import { latestIncomeCeilingDateAtom } from "@/atoms/incomeCeilingAtom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CPF_INCOME_CEILING } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/format";
import { useAtom } from "jotai";
import React, { useState } from "react";

const CPFYearSlider = () => {
  const [latestIncomeCeilingDate, setLatestIncomeCeilingDate] = useAtom(
    latestIncomeCeilingDateAtom,
  );

  const [sliderValue, setSliderValue] = useState(latestIncomeCeilingDate);

  const dateKeys = Object.keys(CPF_INCOME_CEILING);

  const handleValueChange = (value: number[]) => {
    const selectedDate = dateKeys[value[0]];
    setSliderValue(selectedDate);
    setLatestIncomeCeilingDate(selectedDate);
  };

  return (
    <Card className="mb-4 w-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">CPF Income Ceiling by Year</CardTitle>
        <CardDescription>
          Compare income ceilings across different dates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Slider
            value={[dateKeys.indexOf(sliderValue)]}
            onValueChange={handleValueChange}
            min={0}
            max={dateKeys.length - 1}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-sm">
            {dateKeys.map((date) => {
              const isActive = date === sliderValue;
              return (
                <div
                  key={date}
                  className={`text-center transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="mb-1">{formatDate(date)}</div>
                  <div className={isActive ? "font-semibold" : ""}>
                    {formatCurrency(CPF_INCOME_CEILING[date])}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CPFYearSlider;
