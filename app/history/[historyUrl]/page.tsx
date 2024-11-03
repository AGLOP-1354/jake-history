import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";

import Preview from "@/src/components/preview";
import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";

import classes from "./page.module.css";

type Props = {
  params: {
    historyUrl: string;
  };
};

const HistoryDetail = async ({ params }: Props) => {
  const { historyUrl } = await params;
  if (!historyUrl) {
    notFound();
  }

  const { title, content, imageUrl, tags, updatedAt }: HistoryType = await getFetch("/api/history/url", {
    url: historyUrl,
  });

  return (
    <div className={classes.HistoryDetail}>
      <header>
        <h1 className={classes.historyTitle}>{title}</h1>

        <div className={classes.historyDetailSubHeader}>
          <span className={classes.historyDetailUpdatedAt}>{dayjs(updatedAt).format("YY년 DD월 mm일")}</span>

          <div className={classes.historyDetailHandler}>
            <Link href={`/history/edit/${historyUrl}`}>수정</Link>

            <span>삭제</span>
          </div>
        </div>

        {tags && (
          <div className={classes.historyTags}>
            {tags?.map((tag) => (
              <span key={tag.id} className={classes.historyTag}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className={classes.content}>
        {!!imageUrl && (
          <div className={classes.historyDetailImage}>
            <Image src={imageUrl} alt={`${title}-image`} fill quality={100} />
          </div>
        )}

        <Preview
          content={content}
          storyTitle={title}
          onlyContent={true}
          style={{
            padding: "12px 0",
            background: "var(--bg-100)",
            height: "100%",
            overflowY: "visible",
          }}
        />
      </div>
    </div>
  );
};

export default HistoryDetail;
