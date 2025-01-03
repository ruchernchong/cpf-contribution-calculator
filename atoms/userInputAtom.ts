import { atom } from 'jotai';

export const birthDateAtom = atom('');
export const effectiveDateAtom = atom('01 January 2025');
export const grossIncomeAtom = atom(0);

// Derived atom for storing data in browser
export const persistentStorageAtom = atom(
  (get) => ({
    birthDate: get(birthDateAtom),
    effectiveDate: get(effectiveDateAtom),
    grossIncome: get(grossIncomeAtom),
  }),
  (get, set, newValue: { birthDate: string; effectiveDate: string; grossIncome: number }) => {
    set(birthDateAtom, newValue.birthDate);
    set(effectiveDateAtom, newValue.effectiveDate);
    set(grossIncomeAtom, newValue.grossIncome);
  }
);