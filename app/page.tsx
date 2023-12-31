import React from "react";
import StoreProvider from "./StoreProvider";
import { CPFContributionCalculator } from "../components/CPFContributionCalculator";

const HomePage = () => {
  return (
    <StoreProvider>
      <CPFContributionCalculator />
    </StoreProvider>
  );
};

export default HomePage;
