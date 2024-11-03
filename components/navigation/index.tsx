"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import classNames from "classnames";

import { getFetch } from "@/src/lib/customFetch";
import Divider from "@/src/components/display/divider";
import { TagType } from "@/src/lib/types/tag";

import classes from "./navigation.module.css";

const Navigation = () => {
  const searchParams = useSearchParams();
  const selectedTagName = searchParams.get("tag");

  const { data: tagList }: UseQueryResult<TagType[], Error> = useQuery({
    queryKey: ["all-tag-list"],
    queryFn: () => getFetch("/api/tag"),
  });
  const { data: historyCounts = 0 }: UseQueryResult<number, Error> = useQuery({
    queryKey: ["history-counts"],
    queryFn: () => getFetch("/api/history/count"),
  });

  if (!tagList) return null;

  return (
    <div className={classes.Navigation}>
      <header>태그 리스트</header>
      <Divider />

      <div className={classes.tagList}>
        <Link
          href="/"
          className={classNames(classes.link, {
            [classes.selectedTag]: selectedTagName === null,
          })}
        >
          <div className={classes.tag}>
            전체 <span className={classes.historyCount}>({historyCounts})</span>
          </div>
        </Link>

        {tagList?.map(({ id, name, historyCount }) => (
          <Link
            href={`/?tag=${name}`}
            className={classNames(classes.link, {
              [classes.selectedTag]: selectedTagName === name,
            })}
            key={id}
          >
            <div className={classes.tag}>
              {name} <span className={classes.historyCount}>({historyCount})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
