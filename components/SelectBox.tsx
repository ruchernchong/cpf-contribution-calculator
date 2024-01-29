import type { PropsWithChildren, SelectHTMLAttributes } from "react";

interface SelectBoxProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    PropsWithChildren {
  id: string;
  labelText: string;
}

export const SelectBox = ({ id, labelText, ...props }: SelectBoxProps) => {
  return (
    <label htmlFor={id} className="text-teal-600">
      <span>{labelText}</span>
      <select
        id={id}
        className="w-full cursor-pointer border-0 border-b-2 border-teal-600 bg-transparent focus:ring-0"
        aria-label={id}
        {...props}
      />
    </label>
  );
};
