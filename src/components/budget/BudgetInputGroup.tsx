import Input from "../base/Input";

type BudgetInputGroupProps = {
  labelAttrs: React.ComponentPropsWithoutRef<"label">;
  inputAttrs: React.ComponentPropsWithoutRef<"input">;
};

export const BudgetInputGroup = (props: BudgetInputGroupProps) => {
  const { labelAttrs, inputAttrs } = props;
  return (
    <div className="flex flex-col items-center gap-1">
      <label className="text-nowrap" {...labelAttrs}>
        {labelAttrs.children}
      </label>
      <Input {...inputAttrs} />
    </div>
  );
};
