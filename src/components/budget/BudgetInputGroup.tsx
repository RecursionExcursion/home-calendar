import Input from "../base/Input";

type BudgetInputGroupProps = {
  labelAttrs: React.ComponentPropsWithoutRef<"label">;
  inputAttrs: React.ComponentPropsWithoutRef<"input">;
};

export const BudgetInputGroup = (props: BudgetInputGroupProps) => {
  const { labelAttrs, inputAttrs } = props;
  return (
    <div className="colContainer" style={{ gap: ".25rem" }}>
      <label style={{ textWrap: "nowrap" }} {...labelAttrs}>
        {labelAttrs.children}
      </label>
      <Input {...inputAttrs} />
    </div>
  );
};
