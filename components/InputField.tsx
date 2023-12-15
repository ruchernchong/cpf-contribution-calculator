import { InputHTMLAttributes, PropsWithChildren } from "react";

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithChildren {
  id: string;
  labelText: string;
}

export const InputField = ({ id, labelText, ...props }: InputFieldProps) => {
  return (
    <label htmlFor={id} className="text-teal-600">
      <span>{labelText}</span>
      <input
        id={id}
        className="w-full border-0 border-b-2 border-teal-600 bg-transparent focus:border-teal-800 focus:ring-0 dark:text-gray-50 dark:focus:border-teal-400"
        {...props}
      />
    </label>
  );
};
