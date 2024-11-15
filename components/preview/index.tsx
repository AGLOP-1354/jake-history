"use client";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";

import classes from "./preview.module.css";

import "highlight.js/styles/atom-one-dark.css"; // atom-one-dark 다크 테마

type Props = {
  content: string;
  storyTitle: string;
  onlyContent?: boolean;
  style?: {
    [styleName: string]: unknown;
  };
};

const Preview = ({ content, storyTitle, onlyContent, style }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && content) {
      hljs.highlightAll();
    }
  }, [content, isClient]);

  console.log("content", content);
  if (!content || typeof content !== "string") {
    console.error("content is not a string");
    return null;
  }

  if (!isClient) return null;

  return (
    <div className={classes.preview} style={style || {}}>
      {!onlyContent && <h1 className={classes.storyTitle}>{storyTitle}</h1>}
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Preview;
