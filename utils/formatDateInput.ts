export const formatDateInput = (rawInput: string, birthDate: string) => {
  if (rawInput.length === 2 && birthDate.length === 3) {
    rawInput = rawInput.slice(0, 1) + "/";
  } else {
    rawInput = rawInput.replace(/[^0-9]/g, "");

    if (rawInput.length > 2) {
      rawInput = rawInput.substring(0, 2) + "/" + rawInput.substring(2);
    }
  }

  return rawInput;
};
