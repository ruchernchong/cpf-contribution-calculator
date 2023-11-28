import { ChangeEventHandler, PropsWithChildren } from "react";

interface SelectBoxProps extends PropsWithChildren {
  name: string;
  id: string;
  className?: string;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const SelectBox = ({
  name,
  id,
  defaultValue,
  children,
  onChange,
  ...props
}: SelectBoxProps) => {
  return (
    <select
      name={name}
      id={id}
      className="cursor-pointer appearance-none rounded-lg border p-2 dark:bg-gray-900"
      defaultValue={defaultValue}
      onChange={onChange}
      aria-label={id}
      {...props}
    >
      {children}
    </select>
  );
};
