"use client";
import { IconX } from "@tabler/icons-react";

import Input from "../interactive/input";

import classes from "./tagCreateInput.module.css";
import React, { useState } from "react";

type Props = {
  tagList: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
};

const TagCreateInput = ({ tagList = [], addTag, removeTag }: Props) => {
  const [value, setValue] = useState("");

  const _addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;

    if (!value) {
      alert("태그명을 입력해주세요.");
      return;
    }

    const isDuplicateTag = tagList.some((tagName) => tagName.toLowerCase() === value.toLowerCase());
    if (isDuplicateTag) {
      alert("중복되는 태그가 있어요.");
      setValue("");
      return;
    }

    addTag(value);
    setValue("");
  };
  const onChangeTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const tagElements = tagList?.map((tagName) => (
    <div className={classes.tag} key={tagName}>
      {tagName}
      <IconX onClick={() => removeTag(tagName)} width={14} height={14} />
    </div>
  ));

  return (
    <div>
      <Input
        placeholder="태그를 입력 후 Enter를 눌러 생성해주세요."
        onKeyDown={_addTag}
        value={value}
        onChange={onChangeTagInput}
      />

      <div className={classes.tagPreview}>{tagElements}</div>
    </div>
  );
};

export default TagCreateInput;
