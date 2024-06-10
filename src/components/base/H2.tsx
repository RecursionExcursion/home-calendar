import { CSSProperties } from "react";

type h2Style = "budget" | "task" | "dashboard";

const h2Stlyes: Record<h2Style, CSSProperties> = {
  budget: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
  },
  task: {
    fontWeight: 700,
  },
  dashboard: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
    fontWeight: "600",
  },
};

type H2Props = React.ComponentPropsWithoutRef<"h2"> & {
  theme?: h2Style;
};

export default function H2(props: H2Props) {
  const { theme = "budget", ...rest } = props;
  return <h2 style={h2Stlyes[theme]} {...rest} />;
}
