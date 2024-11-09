"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";

import Divider from "@/src/components/display/divider";
import { TagType } from "@/src/lib/types/tag";

import classes from "./navigation.module.css";

type Props = {
  tagList: TagType[];
  historyCounts: number;
};

const Navigation = ({ tagList, historyCounts }: Props) => {
  const searchParams = useSearchParams();
  const selectedTagName = searchParams.get("tag");

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
