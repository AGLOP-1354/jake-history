"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Editor from "@/src/components/editor";
import Preview from "@/src/components/preview";
import Button from "@/src/components/interactive/button";
import Drawer from "@/src/components/interactive/drawer";
import uploadS3Image from "@/src/lib/actions/uploadS3Image";
import { createHistory, updateHistory } from "@/src/lib/actions/history";
import { revalidateTags } from "@/src/lib/actions/revalidTag";
import type { CategoryType } from "@/src/lib/types/category";
import type { HistoryType } from "@/src/lib/types/history";

import HistoryOptionSetting from "./HistoryOptionSetting";
import type { HistoryOptionsType } from "./HistoryOptionSetting";

import classes from "../styles/historyEditor.module.css";

type Props = {
  categories: CategoryType[];
  isEditMode?: boolean;
  history?: HistoryType;
};

const HistoryEditor = ({ categories, isEditMode = false, history }: Props) => {
  const router = useRouter();

  const {
    title: originalTitle,
    content: originalContent,
    imageUrl: originalImageUrl,
    summary: originalSummary,
    category: originalCategory,
  } = history || {};

  const [storyTitle, setStoryTitle] = useState(originalTitle || "");
  const [content, setContent] = useState(originalContent || "");
  const [historyOptions, setHistoryOptions] = useState<HistoryOptionsType>({
    file: null,
    summary: originalSummary || "",
    categoryId: originalCategory?.id || "",
  });
  const [isHistoryOptionsSettingDrawerOpened, setIsHistoryOptionsSettingDrawerOpened] = useState(false);

  useEffect(() => {
    const convertUrlToFile = async () => {
      if (!originalImageUrl) return;

      try {
        const response = await fetch(originalImageUrl);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });

        setHistoryOptions((prev) => ({
          ...prev,
          file,
        }));
      } catch (error) {
        console.error("이미지 변환 중 오류 발생:", error);
      }
    };

    if (originalImageUrl) {
      convertUrlToFile();
    }
  }, [originalImageUrl]);

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
        const formData = new FormData();
        formData.append("file", historyOptions.file);
        const _imageUrl = await uploadS3Image(formData);
        if (!_imageUrl) return;

        imageUrl = _imageUrl;
      }

      const historyData = {
        title: storyTitle.trim(),
        content: content.trim(),
        imageUrl,
        summary: historyOptions.summary?.trim(),
        categoryId: historyOptions.categoryId,
      };

      await createHistory(historyData);

      await revalidateTags(["histories"]);

      alert("히스토리가 등록되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateHistory = async () => {
    try {
      if (!history?.id) return;

      const historyData = {
        id: history.id,
        title: storyTitle.trim(),
        content: content.trim(),
        summary: historyOptions.summary?.trim(),
        categoryId: historyOptions.categoryId,
      };

      const updatedHistory: HistoryType = await updateHistory(history.id, historyData);

      if (!updatedHistory) return;

      await revalidateTags(["histories"]);

      alert("히스토리가 수정되었습니다.");
      router.push(`/history/${updatedHistory.id}`);
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

        <Editor onChange={setContent} initialContent={originalContent} />

        <div className={classes.historyHandler}>
          <Link href="/" className={classes.prevButton}>
            나가기
          </Link>

          <Button type="primary" onClick={onOpenHistoryOptionsSettingDrawer}>
            {isEditMode ? "수정완료" : "작성완료"}
          </Button>
        </div>
      </div>

      <Preview content={content} storyTitle={storyTitle} style={{ margin: 0, minHeight: "calc(100svh - 56px)" }} />

      <Drawer onClose={onCloseHistoryOptionsSettingDrawer} open={isHistoryOptionsSettingDrawerOpened}>
        <HistoryOptionSetting
          onCancel={onCloseHistoryOptionsSettingDrawer}
          onSubmit={isEditMode ? onUpdateHistory : onSaveHistory}
          historyOptions={historyOptions}
          onChangeHistoryOptions={onChangeHistoryOptions}
          categories={categories}
          isEditMode={isEditMode}
        />
      </Drawer>
    </div>
  );
};

export default HistoryEditor;
