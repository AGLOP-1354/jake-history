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

import HistoryOptionSetting from "./HistoryOptionSetting";
import type { HistoryOptionsType } from "./HistoryOptionSetting";

import classes from "../styles/historyEditor.module.css";

const HistoryEditor = () => {
  const router = useRouter();

  const [storyTitle, setStoryTitle] = useState("");
  const [content, setContent] = useState("");
  const [historyOptions, setHistoryOptions] = useState<HistoryOptionsType>({
    file: null,
    summary: "",
    url: "",
    categoryId: "",
    tagIds: [],
  });
  const [isHistoryOptionsSettingDrawerOpened, setIsHistoryOptionsSettingDrawerOpened] = useState(false);

  console.log("historyOptions", historyOptions);
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

    const joinedStoryTitle = storyTitle.split(" ").join("-");
    onChangeHistoryOptions({ url: joinedStoryTitle });
    setIsHistoryOptionsSettingDrawerOpened(true);
  };
  const onCloseHistoryOptionsSettingDrawer = () => setIsHistoryOptionsSettingDrawerOpened(false);

  const onSaveHistory = async () => {
    try {
      let imageUrl = "";

      if (historyOptions.file) {
        const _imageUrl = await uploadS3Image(historyOptions.file);
        if (!_imageUrl) {
          throw new Error("이미지 업로드에 실패했습니다.");
        }

        imageUrl = _imageUrl;
      }

      await postFetch("/api/history", {
        title: storyTitle,
        content,
        ...historyOptions,
        imageUrl,
      });

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
        <Editor content={content} onChange={setContent} />

        <div className={classes.historyHandler}>
          <Link href="/public" className={classes.prevButton}>
            나가기
          </Link>

          <Button type="primary" onClick={onOpenHistoryOptionsSettingDrawer}>
            작성완료
          </Button>
        </div>
      </div>

      <Preview content={content} storyTitle={storyTitle} />

      <Drawer onClose={onCloseHistoryOptionsSettingDrawer} open={isHistoryOptionsSettingDrawerOpened}>
        <HistoryOptionSetting
          historyTitle={storyTitle || "임시 텍스트"}
          onCancel={onCloseHistoryOptionsSettingDrawer}
          onSubmit={onSaveHistory}
          historyOptions={historyOptions}
          onChangeHistoryOptions={onChangeHistoryOptions}
        />
      </Drawer>
    </div>
  );
};

export default HistoryEditor;
