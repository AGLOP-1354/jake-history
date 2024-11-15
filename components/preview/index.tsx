"use client";
import React, { useEffect } from "react";
import hljs from "highlight.js";

import sql from "highlight.js/lib/languages/sql";
import javascript from "highlight.js/lib/languages/javascript";
import c from "highlight.js/lib/languages/c";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";
import shell from "highlight.js/lib/languages/shell";
import python from "highlight.js/lib/languages/python";
import powershell from "highlight.js/lib/languages/powershell";
import cpp from "highlight.js/lib/languages/cpp";
import php from "highlight.js/lib/languages/php";
import phpTemplate from "highlight.js/lib/languages/php-template";
import xml from "highlight.js/lib/languages/xml";

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
  useEffect(() => {
    hljs.registerLanguage("sql", sql);
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("c", c);
    hljs.registerLanguage("cpp", cpp);
    hljs.registerLanguage("powershell", powershell);
    hljs.registerLanguage("shell", shell);
    hljs.registerLanguage("scss", scss);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("php", php);
    hljs.registerLanguage("php-template", phpTemplate);
    hljs.registerLanguage("html", xml);
    hljs.registerLanguage("xml", xml);
  }, []);

  useEffect(() => {
    hljs.initHighlighting();
  }, [content]);

  return (
    <div className={classes.preview} style={style || {}}>
      {!onlyContent && <h1 className={classes.storyTitle}>{storyTitle}</h1>}
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Preview;
