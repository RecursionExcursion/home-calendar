"use client";

type SurfCamProps = {
  view: "flag" | "pier";
};

export default function SurfCam(props: SurfCamProps) {
  let src = "";

  switch (props.view) {
    case "flag":
      src =
        "https://link.edgepilot.com/s/93882c79/_t5E-tquPki07i1B0dG1kw?u=https://player.brownrice.com/embed/wzzmbeach";
      break;
    case "pier":
      src =
        "https://link.edgepilot.com/s/ee4c9c92/AdsMfRKXdk6JzU0N3EUkvg?u=https://player.brownrice.com/embed/wzzmlighthouse";
      break;
  }

  return (
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="100%"
      src={src}
    ></iframe>
  );
}
