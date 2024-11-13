import Image from "next/image";
import Link from "next/link";
import { IconPhotoScan } from "@tabler/icons-react";

import { HistoryType } from "@/src/lib/types/history";
import getContrastingTextColor from "@/src/lib/utils/getContrastingTextColor";

import classes from "./historyCard.module.css";

const HistoryCard = ({ id, title, imageUrl, summary, content, category }: HistoryType) => {
  const contrastingTextColor = getContrastingTextColor(category?.color || "#000000");

  return (
    <div className={classes.HistoryCard}>
      <Link href={`/history/${id}`} className={classes.link}>
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
        </div>
      </Link>

      <div
        className={classes.historyCategory}
        style={{ backgroundColor: category?.color, color: contrastingTextColor }}
      >
        {category?.name}
      </div>
    </div>
  );
};

export default HistoryCard;
