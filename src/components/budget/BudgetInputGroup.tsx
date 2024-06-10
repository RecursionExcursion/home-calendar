import Input from "../base/Input";

type BudgetInputGroupProps = {
  labelAttrs: React.ComponentPropsWithoutRef<"label">;
  inputAttrs: React.ComponentPropsWithoutRef<"input">;
};

export const BudgetInputGroup = (props: BudgetInputGroupProps) => {
  const { labelAttrs, inputAttrs } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".25rem",
      }}
    >
      <label style={{ textWrap: "nowrap" }} {...labelAttrs}>
        {labelAttrs.children}
      </label>
      <Input {...inputAttrs} />
    </div>
  );
};
