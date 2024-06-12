type GridProps = {
  headers: JSX.Element;
  daySqauares: JSX.Element[];
};

export const Grid7 = (props: GridProps) => {
  const { headers, daySqauares } = props;
  return (
    <>
      <div className="grid7" style={{ borderBottom: "0" }}>
        {headers}
      </div>
      <div className="grid7" style={{ height: "100%" }}>
        {daySqauares.map((daySquare) => daySquare)}
      </div>
    </>
  );
};

export const Grid1 = (props: GridProps) => {
  const { headers, daySqauares } = props;
  return (
    <>
      <div className="grid1">{headers}</div>
      <div className="grid1">{daySqauares.map((daySquare) => daySquare)}</div>
    </>
  );
};
