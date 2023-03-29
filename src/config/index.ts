import type { FAQ } from "../types";

export const DEFAULT_EMPLOYEE_CONTRIBUTION: number = 0.2;

export const faqs: FAQ[] = [
  {
    question: "Does this collect any of my data?",
    answer:
      "No data is being collected from this. The inputs will be wiped on browser refresh.",
  },
  {
    question: "Do I need to login to use this?",
    answer:
      "No login is required to use this. There is no reason to implement this since this is not storing any form of data",
  },
  {
    question: "Why are you doing this?",
    answer:
      "As a developer, I just love to build things. I created this immediately fter the announcement of the CPF income ceiling changes in Budget 2023 (14 February). I wanted to challenge myself and see how quickly I could react to design and deploy to production a particular microservice/product.",
  },
  {
    question:
      "I am a developer and I wish to contribute changes to this. How may I do so?",
    answer:
      "This is an open-source project. All contributions are welcomed. Feel free to clone/fork the repository and create a pull request.",
  },
];
