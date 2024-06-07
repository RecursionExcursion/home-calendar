type GridProps = {
  headers: JSX.Element;
  daySqauares: JSX.Element[];
};

export const Grid7 = (props: GridProps) => {
  const { headers, daySqauares } = props;
  const style = { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", width: "100%" };
  return (
    <>
      <div style={{ ...style, borderBottom: "0" }}>{headers}</div>
      <div style={{ ...style, height: "100%" }}>
        {daySqauares.map((daySquare) => daySquare)}
      </div>
    </>
  );
};

export const Grid1 = (props: GridProps) => {
  const { headers, daySqauares } = props;
  const style = { display: "grid", gridTemplateColumns: "repeat(1, 1fr)" };
  return (
    <>
      <div style={style}>{headers}</div>
      <div style={style}>{daySqauares.map((daySquare) => daySquare)}</div>
    </>
  );
};
