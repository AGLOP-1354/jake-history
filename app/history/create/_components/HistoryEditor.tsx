"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Editor from "@/src/components/editor";
import Preview from "@/src/components/preview";
import Button from "@/src/components/interactive/button";
import Drawer from "@/src/components/interactive/drawer";
import { postFetch } from "@/src/lib/customFetch";
import uploadS3Image from "@/src/lib/actions/uploadS3Image";
import { revalidateTags } from "@/src/lib/actions/revalidTag";
import type { CategoryType } from "@/src/lib/types/category";

import HistoryOptionSetting from "./HistoryOptionSetting";
import type { HistoryOptionsType } from "./HistoryOptionSetting";

import classes from "../styles/historyEditor.module.css";

const HistoryEditor = ({ categories }: { categories: CategoryType[] }) => {
  const router = useRouter();

  const [storyTitle, setStoryTitle] = useState("");
  const [content, setContent] = useState("");
  const [historyOptions, setHistoryOptions] = useState<HistoryOptionsType>({
    file: null,
    summary: "",
    categoryId: "",
  });
  const [isHistoryOptionsSettingDrawerOpened, setIsHistoryOptionsSettingDrawerOpened] = useState(false);

  const onChangeHistoryOptions = (changedOptions: HistoryOptionsType) => {
    setHistoryOptions((prevHistoryOptions) => ({
      ...prevHistoryOptions,
      ...changedOptions,
    }));
  };

  const onOpenHistoryOptionsSettingDrawer = () => {
    if (!storyTitle) {
      alert("Please enter a title");
      return;
    }

    if (!content) {
      alert("Please enter a content");
      return;
    }

    setIsHistoryOptionsSettingDrawerOpened(true);
  };
  const onCloseHistoryOptionsSettingDrawer = () => setIsHistoryOptionsSettingDrawerOpened(false);

  const onSaveHistory = async () => {
    try {
      let imageUrl = "";

      if (historyOptions.file) {
        const _imageUrl = await uploadS3Image(historyOptions.file);
        if (!_imageUrl) return;

        imageUrl = _imageUrl;
      }

      await postFetch({
        url: "/api/history",
        queryParams: {
          title: storyTitle,
          content,
          imageUrl,
          ...historyOptions,
        },
      });

      await revalidateTags(["histories"]);

      alert("히스토리가 등록되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.editorContainer}>
      <div className={classes.editor}>
        <input
          type="text"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          placeholder="제목을 적어주세요."
          className={classes.storyTitleInput}
        />

        <Editor onChange={setContent} />

        <div className={classes.historyHandler}>
          <Link href="/" className={classes.prevButton}>
            나가기
          </Link>

          <Button type="primary" onClick={onOpenHistoryOptionsSettingDrawer}>
            작성완료
          </Button>
        </div>
      </div>

      <Preview content={content} storyTitle={storyTitle} style={{ margin: 0 }} />

      <Drawer onClose={onCloseHistoryOptionsSettingDrawer} open={isHistoryOptionsSettingDrawerOpened}>
        <HistoryOptionSetting
          onCancel={onCloseHistoryOptionsSettingDrawer}
          onSubmit={onSaveHistory}
          historyOptions={historyOptions}
          onChangeHistoryOptions={onChangeHistoryOptions}
          categories={categories}
        />
      </Drawer>
    </div>
  );
};

export default HistoryEditor;
