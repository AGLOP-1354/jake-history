"use client";
import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "highlight.js/styles/atom-one-dark.css";

import classes from "./preview.module.css";

type Props = {
  content: string;
  storyTitle: string;
  onlyContent?: boolean;
  style?: {
    [styleName: string]: unknown;
  };
};

const Preview = ({ content, storyTitle, onlyContent, style }: Props) => {
  const viewerRef = useRef<Viewer>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.getInstance().setMarkdown(content);
      const viewerElement = viewerRef.current.getRootElement();

      const lines = content.split("\n");
      const headingIndices = lines.reduce<number[]>((acc, line, index) => {
        if (line.match(/^##\s+(.+)$/) || line.match(/^###\s+(.+)$/)) {
          acc.push(index);
        }
        return acc;
      }, []);

      const headings = viewerElement.querySelectorAll("h2, h3");
      headings.forEach((heading, index) => {
        heading.id = `heading-${headingIndices[index]}`;
      });

      const codeBlocks = viewerElement.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        try {
          hljs.highlightElement(block as HTMLElement);

          const pre = block.parentElement;
          if (pre) {
            const copyButton = document.createElement("button");
            copyButton.innerHTML = "Copy";
            copyButton.className = classes.copyButton;
            copyButton.onclick = () => {
              navigator.clipboard.writeText(block.textContent || "");
              copyButton.innerHTML = "Copied!";
              setTimeout(() => {
                copyButton.innerHTML = "Copy";
              }, 2000);
            };
            pre.appendChild(copyButton);
          }
        } catch (error) {
          console.error("Error highlighting code block:", error);
        }
      });
    }
  }, [content]);

  return (
    <div className={classes.preview} style={style || {}}>
      {!onlyContent && <h1 className={classes.storyTitle}>{storyTitle}</h1>}
      <Viewer ref={viewerRef} initialValue={content} theme="dark" />
    </div>
  );
};

export default Preview;
