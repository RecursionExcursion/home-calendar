"use client";

import { useEffect, useRef } from "react";

export default function SurfCam() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const iframeContent = iframe.contentWindow?.document;
      if (!iframeContent) return;

      // Calculate the desired scroll position (50% of the content height in this example)
      const scrollPercentage = 0.5; // Change this value to the desired scroll percentage (0.0 to 1.0)
      const contentHeight = iframeContent.documentElement.scrollHeight;
      const scrollPosition = contentHeight * scrollPercentage;

      // Scroll to the calculated position
      iframe.contentWindow.scrollTo(0, scrollPosition);
    };

    const target = iframeRef.current;
    if (target) {
      target.addEventListener("load", handleIframeLoad);
    }

    return () => {
      if (target) {
        target.removeEventListener("load", handleIframeLoad);
      }
    };
  }, []);
  return (
    <iframe
      ref={iframeRef}
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="100%"
      src="https://grandhaven.org/visitors/beach-information/"
    ></iframe>
  );
}
