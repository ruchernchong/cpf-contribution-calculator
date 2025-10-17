import CPFInvestmentComparison from "@/components/cpf-investment-comparison";
import { PageNavigation } from "@/components/page-navigation";

const InvestmentsPage = () => {
  return (
    <div className="mx-auto px-4 py-12">
      <PageNavigation />
      <div>
        <h2 className="mb-6 text-center font-semibold text-2xl">
          Investment Comparison
        </h2>
        <CPFInvestmentComparison />
      </div>
    </div>
  );
};

export default InvestmentsPage;
