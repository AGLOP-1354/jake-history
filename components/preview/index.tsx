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
  const [toc, setToc] = useState([]);
  const [processedContent, setProcessedContent] = useState(content);

  useEffect(() => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;

    const headings = Array.from(tempElement.querySelectorAll("h1, h2"));
    const tocItems = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.innerText,
        tag: heading.tagName,
      };
    });

    setToc(tocItems);
    setProcessedContent(tempElement.innerHTML);
  }, [content]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      hljs.highlightAll();
    }
  }, [content, isClient]);

  if (!isClient) return null;

  return (
    <div className={classes.preview} style={style || {}}>
      <nav style={{ width: "200px", marginRight: "20px" }}>
        <h3>목차</h3>
        <ul>
          {toc.map(({ id, text, tag }) => (
            <li key={id} style={{ marginLeft: tag === "H2" ? "20px" : "0" }}>
              <button onClick={() => scrollToSection(id)} style={{ all: "unset", cursor: "pointer", color: "blue" }}>
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {!onlyContent && <h1 className={classes.storyTitle}>{storyTitle}</h1>}
      <span dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  );
};

export default Preview;
