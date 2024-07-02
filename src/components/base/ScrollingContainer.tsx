"use client";
import React, { useEffect, useRef } from "react";

export type ScrollingTextAreaProps = {
  children: JSX.Element;
  className?: string;
  speed?: number;
};

export default function ScrollingContainer(props: ScrollingTextAreaProps) {
  const { children, className, speed = 250 } = props;

  const divAreaRef = useRef<HTMLDivElement>(null);
  const scrollIndexRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const bottomhangTime = 10; //hang + scrollSpeed = time it will stay at the bottom before resetting

  const scroll = async () => {
    if (divAreaRef.current === null) {
      throw new Error("ref is undefined");
    }

    const divHeight = divAreaRef.current.clientHeight;
    const scrollHeight = divAreaRef.current.scrollHeight;

    console.log({ divHeight, scrollHeight, bottomhangTime, speed });

    if (divHeight >= scrollHeight) return; //Kicks out if the div is not overflowing

    const scrollTill = divAreaRef.current.scrollHeight - divHeight + bottomhangTime;

    scrollIndexRef.current =
      scrollIndexRef.current === scrollTill ? 0 : scrollIndexRef.current + 1;

    console.log({ scrollIndex: scrollIndexRef.current});
    

    timeoutRef.current = setTimeout(() => {
      divAreaRef.current?.scrollTo({
        top: scrollIndexRef.current,
        behavior: "smooth",
      });
      scroll(); //Will recursively scroll until the component is unmounted
    }, speed);
  };

  useEffect(() => {
    scroll();
    //clean up
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div ref={divAreaRef} className={className}>
      {children}
    </div>
  );
}
