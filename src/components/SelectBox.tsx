import { ChangeEventHandler, PropsWithChildren } from "react";

interface SelectBoxProps extends PropsWithChildren {
  name: string;
  id: string;
  className?: string;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const SelectBox = (props: SelectBoxProps) => {
  const { name, id, defaultValue, children, onChange, ...rest } = props;

  return (
    <select
      name={name}
      id={id}
      className="mb-2 w-full cursor-pointer appearance-none rounded-lg p-2 shadow-md shadow-neutral-200 dark:text-neutral-900 dark:shadow-none md:w-1/3"
      defaultValue={defaultValue}
      onChange={onChange}
      {...rest}
    >
      {children}
    </select>
  );
};
