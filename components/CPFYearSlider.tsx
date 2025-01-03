import React from "react";
import { useAtom } from "jotai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { selectedYearAtom, yearCeilingsAtom } from "@/atoms/yearSliderAtom";
import { formatCurrency } from "@/lib/format";

const CPFYearSlider = () => {
  const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);
  const [yearCeilings] = useAtom(yearCeilingsAtom);

  return (
    <Card className="mb-4 w-full">
      <CardHeader>
        <CardTitle className="text-lg">CPF Income Ceiling by Year</CardTitle>
        <CardDescription>
          Compare income ceilings across different years
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Year</Label>
            <div className="pt-4">
              <Slider
                value={[selectedYear]}
                onValueChange={(value) => setSelectedYear(value[0])}
                min={2023}
                max={2026}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between px-2 text-sm text-gray-500">
              {Object.entries(yearCeilings).map(([year, ceiling]) => (
                <div key={year} className="text-center">
                  <div>{year}</div>
                  <div>{formatCurrency(ceiling)}</div>
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
