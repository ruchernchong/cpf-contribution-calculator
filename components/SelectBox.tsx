import { Fragment, PropsWithChildren, SelectHTMLAttributes } from "react";

interface SelectBoxProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    PropsWithChildren {
  id: string;
  labelText: string;
}

export const SelectBox = ({ id, labelText, ...props }: SelectBoxProps) => {
  return (
    <Fragment>
      <label htmlFor={id} className="translate-y-4 text-xs text-teal-600">
        {labelText}
      </label>
      <select
        id={id}
        className="w-full cursor-pointer appearance-none border-b bg-transparent py-2 outline-none"
        aria-label={id}
        {...props}
      />
    </Fragment>
  );
};
