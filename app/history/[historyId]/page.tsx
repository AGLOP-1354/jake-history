import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";

import Preview from "@/src/components/preview";
import { getFetch } from "@/src/lib/customFetch";
import { HistoryType } from "@/src/lib/types/history";

import classes from "./page.module.css";

type Props = {
  params: Promise<{ historyId: string }>;
};

const HistoryDetail = async ({ params }: Props) => {
  const { historyId } = await params;
  if (!historyId) {
    notFound();
  }

  const { title, content, imageUrl, updatedAt }: HistoryType = await getFetch({
    url: "/api/history/one",
    queryParams: { id: historyId },
  });
  console.log("content", content);

  return (
    <div className={classes.HistoryDetail}>
      <header>
        <h1 className={classes.historyTitle}>{title}</h1>

        <div className={classes.historyDetailSubHeader}>
          <span className={classes.historyDetailUpdatedAt}>{dayjs(updatedAt).format("YY년 MM월 DD일")}</span>

          <div className={classes.historyDetailHandler}>
            <Link href={`/history/edit/${historyId}`}>수정</Link>

            <span>삭제</span>
          </div>
        </div>
      </header>

      <div className={classes.content}>
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
            padding: "12px 0",
            background: "var(--bg-100)",
          }}
        />
      </div>
    </div>
  );
};

export default HistoryDetail;
