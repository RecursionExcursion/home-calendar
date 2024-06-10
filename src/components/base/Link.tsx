import Link from "next/link";
import { colors } from "../../styles/colors";
import { CSSProperties } from "react";

type styleKey = "link";

const styles: Record<styleKey, CSSProperties> = {
  link: {
    color: colors.blueLink,
    textDecoration: "underline",
  },
};

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  children: React.ReactNode;
  theme?: styleKey;
};

export default function StyledLink(props: LinkProps) {
  const { children, href = "/", theme = "link", ...rest } = props;
  return (
    <Link style={styles[theme]} href={href} {...rest}>
      {children}
    </Link>
  );
}
