import CPFInterestRatesSection from "@/components/cpf-interest-rates-section";
import DistributionRatesTable from "@/components/distribution-rates-table";
import { PageNavigation } from "@/components/page-navigation";

const InterestRatesPage = () => {
  return (
    <div className="mx-auto px-4 py-12">
      <PageNavigation />
      <div className="space-y-12">
        <div>
          <h2 className="mb-6 text-center font-semibold text-2xl">
            CPF Interest Rates
          </h2>
          <CPFInterestRatesSection />
        </div>
        <div>
          <h2 className="mb-6 text-center font-semibold text-2xl">
            Distribution Rates by Age Group
          </h2>
          <DistributionRatesTable />
        </div>
      </div>
    </div>
  );
};

export default InterestRatesPage;
