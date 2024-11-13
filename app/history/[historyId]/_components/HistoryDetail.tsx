"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

import Preview from "@/src/components/preview";

import TableOfContents from "./TableOfContents";

import classes from "../_styles/historyDetail.module.css";

type tocItems = {
  id: string;
  text: string;
  tag: string;
}[];

type Props = {
  content: string;
  title: string;
  imageUrl?: string;
  createdAt: Date;
};

const HistoryDetail = ({ content, title, imageUrl, createdAt }: Props) => {
  const [toc, setToc] = useState<tocItems>([]);
  const [processedContent, setProcessedContent] = useState(content);

  useEffect(() => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;

    const headings = Array.from(tempElement.querySelectorAll("h2, h3"));
    const tocItems = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: (heading as HTMLElement).innerText,
        tag: heading.tagName,
      };
    });

    setToc(tocItems);
    setProcessedContent(tempElement.innerHTML);
  }, [content]);

  const ammountOfLetters = useMemo(() => {
    const letters = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return letters.length;
  }, [content]);

  return (
    <div className={classes.HistoryDetail}>
      <div className={classes.content}>
        <header>
          <h1 className={classes.historyTitle}>{title}</h1>
        </header>

        <div className={classes.contentBody}>
          {!!imageUrl && (
            <div className={classes.historyDetailImage}>
              <Image className={classes.image} src={imageUrl} alt={`${title}-image`} fill quality={100} />
            </div>
          )}

          <Preview
            content={processedContent}
            storyTitle={title}
            onlyContent={true}
            style={{
              background: "var(--bg-100)",
              padding: "36px 0",
            }}
          />
        </div>
      </div>

      <TableOfContents toc={toc} createdAt={createdAt} ammountOfLetters={ammountOfLetters} />
    </div>
  );
};

export default HistoryDetail;
