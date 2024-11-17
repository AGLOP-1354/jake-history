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
  historyId: string;
  content: string;
  title: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
  likeCount: number;
  isLiked: boolean;
};

const HistoryDetail = ({ historyId, content, title, imageUrl, createdAt, updatedAt, likeCount, isLiked }: Props) => {
  const [toc, setToc] = useState<tocItems>([]);

  useEffect(() => {
    const removeMarkdown = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .replace(/~~(.*?)~~/g, "$1")
        .trim();
    };

    const lines = content.split("\n");
    const tocItems = lines
      .map((line, index) => {
        const h2Match = line.match(/^##\s+(.+)$/);
        const h3Match = line.match(/^###\s+(.+)$/);

        if (h2Match) {
          return {
            id: `heading-${index}`,
            text: removeMarkdown(h2Match[1]),
            tag: "H2",
          };
        }
        if (h3Match) {
          return {
            id: `heading-${index}`,
            text: removeMarkdown(h3Match[1]),
            tag: "H3",
          };
        }
        return null;
      })
      .filter((item): item is { id: string; text: string; tag: string } => item !== null);

    setToc(tocItems);
  }, [content]);

  const ammountOfLetters = useMemo(() => {
    const letters = content
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/~~(.*?)~~/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/#{1,6}\s/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/^\s*[-+*]\s/gm, "")
      .replace(/^\s*\d+\.\s/gm, "")
      .trim();

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
            content={content}
            storyTitle={title}
            onlyContent={true}
            style={{
              background: "var(--bg-100)",
              padding: "36px 0",
            }}
          />
        </div>
      </div>

      <TableOfContents
        historyId={historyId}
        toc={toc}
        createdAt={createdAt}
        updatedAt={updatedAt}
        ammountOfLetters={ammountOfLetters}
        likeCount={likeCount}
        isLiked={isLiked}
      />
    </div>
  );
};

export default HistoryDetail;
