import Input from "../../base/Input";

type BudgetInputGroupProps = {
  labelAttrs: React.ComponentPropsWithoutRef<"label">;
  inputAttrs: React.ComponentPropsWithoutRef<"input">;
  direction?: "row" | "column";
};

export const BudgetInputGroup = (props: BudgetInputGroupProps) => {
  const { labelAttrs, inputAttrs, direction = "column" } = props;

  const className = direction === "row" ? "rowContainer" : "colContainer";
  return (
    <div className={className} style={{ gap: ".25rem" }}>
      <label style={{ textWrap: "nowrap" }} {...labelAttrs}>
        {labelAttrs.children}
      </label>
      <Input {...inputAttrs} />
    </div>
  );
};
