import type { FAQ } from "../types";

export const CPF_INCOME_CEILING_BEFORE_SEPT_2023: number = 6000;
export const CPF_INCOME_CEILING: Record<number | string, number> = {
  2023: 6000,
  SEPT2023: 6300,
  2024: 6800,
  2025: 7400,
  2026: 8000,
};
export const CPF_ADDITIONAL_WAGE_CEILING: number = 102000;

export const DEFAULT_EMPLOYEE_CONTRIBUTION: number = 0.2;
export const DEFAULT_EMPLOYER_CONTRIBUTION: number = 0.17;

export const faqs: FAQ[] = [
  {
    question: 'What is this "calculator" about?',
    answer:
      "Following the announcement from the Ministry of Finance (MOF) during the Budget 2023 on 14 February 2023, the CPF income ceiling will be raised gradually from $6000 to $8000 by September 2026. This service has no affiliation with neither the MOF nor the CPF Board.",
  },
  {
    question: "Does this collect any of my data?",
    answer:
      "No data are being collected. The inputs are wiped on browser refresh. However, if you have checked the checkbox, you will be storing the input on the browser.",
  },
  {
    question: "Do I need to login to use this?",
    answer:
      "No login is required. There is no reason to implement this since it is not storing any form of data",
  },
  {
    question: 'Should I check the "Store input on this browser?"',
    answer:
      "This is a feature to help with storing the input value on your own browser and for the convenience of not having to re-type your input when you return to this page. It is strictly up to you to decide to use this function or not.",
  },
  {
    question: "Why are you doing this?",
    answer:
      "As a developer, I just love to build things. I created this immediately after the announcement of the CPF income ceiling changes in Budget 2023 (14 February). I wanted to challenge myself and see how quickly could I react to design and deploy to production a particular microservice/product.",
  },
  {
    question:
      "I am a developer and I wish to contribute changes to this. How may I do so?",
    answer:
      "This is an open-source project. All contributions are welcomed. Feel free to clone/fork the repository and create a pull request.",
  },
];
