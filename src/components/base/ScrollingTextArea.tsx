"use client";

import { useEffect, useRef } from "react";

type ScrollingTextAreaProps = {
  text: string;
};

export default function ScrollingTextArea(props: ScrollingTextAreaProps) {
  const { text } = props;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const scrollIndex = useRef<number>(0);

  useEffect(() => {
    console.log({ textAreaRef, text });

    const taHeight = textAreaRef.current?.clientHeight;
    const taScrollHeight = textAreaRef.current?.scrollHeight;

    if (!taHeight || !taScrollHeight) return;
    if (taHeight >= taScrollHeight) return;



    timeoutRef.current = setTimeout(() => {
      textAreaRef.current?.scrollTo({
        top: scrollIndex.current + 1,
        behavior: "smooth",
      });

        scrollIndex.current =
            scrollIndex.current === taScrollHeight - taHeight ? 0 : scrollIndex.current + 1;
    }, 2000);

    scroll();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return <textarea ref={textAreaRef} className="text-area" value={text} readOnly />;
}

const scroll = () => {};
