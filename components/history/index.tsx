import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { IconPhotoScan } from "@tabler/icons-react";

import { HistoryType } from "@/src/lib/types/history";

import classes from "./history.module.css";

const History = ({
  title,
  imageUrl,
  summary,
  content,
  url,
  updatedAt,
  tags,
  // categoryId?: string;
}: HistoryType) => {
  return (
    <div className={classes.History}>
      <Link href={`/history/${url}`} className={classes.link}>
        <div className={classes.historyImage}>
          {imageUrl ? (
            <Image quality={100} src={imageUrl} alt={`${title} 이미지`} fill className={classes.image} />
          ) : (
            <div className={classes.noHistoryImage}>
              <IconPhotoScan width={128} height={128} />
              <span>이미지가 없어요.</span>
            </div>
          )}
        </div>

        <div className={classes.historyContentWrapper}>
          <h3 className={classes.historyTitle}>{title}</h3>
          <span className={classes.historyContent}>{summary || content}</span>

          <span className={classes.historyCreateDate}>{dayjs(updatedAt).format("YY년 DD월 mm일")}</span>
        </div>

        <div style={{ height: 1, width: "100svw", background: "#9e9e9e" }} />
        <div className={classes.historyAdditionalInformation}>
          <div className={classes.historyTags}>
            {tags?.map((tag) => (
              <span key={tag.id} className={classes.historyTag}>
                {tag.name}
              </span>
            ))}
          </div>

          {/*<span className={classes.heartCount}>하트 {likeCount}</span>*/}
        </div>
      </Link>
    </div>
  );
};

export default History;
