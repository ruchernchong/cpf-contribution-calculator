import React from 'react';
import { useAtomValue } from 'jotai';
import { selectedYearAtom, yearCeilingsAtom } from '@/atoms/yearSliderAtom';
import { distributionResultsAtom } from '@/atoms/resultAtom';
import { formatCurrency } from '@/lib/format';

const YearOverYearTable: React.FC = () => {
  const selectedYear = useAtomValue(selectedYearAtom);
  const yearCeilings = useAtomValue(yearCeilingsAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);

  // Get all available years sorted
  const years = Object.keys(yearCeilings)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Year</th>
            <th className="border border-gray-300 p-2">CPF Income Ceiling</th>
            <th className="border border-gray-300 p-2">Employee CPF Contribution</th>
            <th className="border border-gray-300 p-2">Employer CPF Contribution</th>
            <th className="border border-gray-300 p-2">Total CPF Contribution</th>
            <th className="border border-gray-300 p-2">Take-Home Pay</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year, index) => {
            const yearResults = distributionResults[year] || {};
            const previousResults = index > 0 ? distributionResults[years[index - 1]] : null;

            return (
              <tr key={year} className={year === selectedYear ? 'bg-blue-50' : ''}>
                <td className="border border-gray-300 p-2 text-center">{year}</td>
                <td className="border border-gray-300 p-2 text-right">
                  {formatCurrency(yearCeilings[year])}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {yearResults.employeeContribution ? formatCurrency(yearResults.employeeContribution) : 'N/A'}
                  {previousResults && (
                    <div className="text-xs text-gray-500">
                      {yearResults.employeeContribution > previousResults.employeeContribution 
                        ? `+${formatCurrency(yearResults.employeeContribution - previousResults.employeeContribution)}` 
                        : `-${formatCurrency(previousResults.employeeContribution - yearResults.employeeContribution)}`}
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {yearResults.employerContribution ? formatCurrency(yearResults.employerContribution) : 'N/A'}
                  {previousResults && (
                    <div className="text-xs text-gray-500">
                      {yearResults.employerContribution > previousResults.employerContribution 
                        ? `+${formatCurrency(yearResults.employerContribution - previousResults.employerContribution)}` 
                        : `-${formatCurrency(previousResults.employerContribution - yearResults.employerContribution)}`}
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {yearResults.totalContribution ? formatCurrency(yearResults.totalContribution) : 'N/A'}
                  {previousResults && (
                    <div className="text-xs text-gray-500">
                      {yearResults.totalContribution > previousResults.totalContribution 
                        ? `+${formatCurrency(yearResults.totalContribution - previousResults.totalContribution)}` 
                        : `-${formatCurrency(previousResults.totalContribution - yearResults.totalContribution)}`}
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {yearResults.takeHomePay ? formatCurrency(yearResults.takeHomePay) : 'N/A'}
                  {previousResults && (
                    <div className="text-xs text-gray-500">
                      {yearResults.takeHomePay > previousResults.takeHomePay 
                        ? `+${formatCurrency(yearResults.takeHomePay - previousResults.takeHomePay)}` 
                        : `-${formatCurrency(previousResults.takeHomePay - yearResults.takeHomePay)}`}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default YearOverYearTable;