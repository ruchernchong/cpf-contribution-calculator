import { Fragment, InputHTMLAttributes, PropsWithChildren } from "react";

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithChildren {
  id: string;
  labelText: string;
}

export const InputField = ({ id, labelText, ...props }: InputFieldProps) => {
  return (
    <Fragment>
      <label htmlFor={id} className="translate-y-4 text-xs text-teal-600">
        {labelText}
      </label>
      <input
        id={id}
        className="w-full border-b bg-transparent py-2 text-gray-50 outline-none"
        {...props}
      />
    </Fragment>
  );
};
