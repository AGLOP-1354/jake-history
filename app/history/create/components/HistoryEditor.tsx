"use client";
import React, { useState } from "react";
import Link from "next/link";

import Editor from "@/src/components/editor";
import Preview from "@/src/components/preview";
import Button from "@/src/components/interactive/button";
import Drawer from "@/src/components/interactive/drawer";
import { postFetch } from "@/src/lib/customFetch";

import HistoryOptionSetting from "./HistoryOptionSetting";
import type { HistoryOptionsType } from "./HistoryOptionSetting";

import classes from "../styles/historyEditor.module.css";

const HistoryEditor = () => {
  const [storyTitle, setStoryTitle] = useState("");
  const [content, setContent] = useState("");
  const [historyOptions, setHistoryOptions] = useState<HistoryOptionsType>({
    image: "",
    summary: "",
    url: "",
    category: "",
    tagList: [],
  });
  const [isHistoryOptionsSettingDrawerOpened, setIsHistoryOptionsSettingDrawerOpened] = useState(false);

  const onChangeHistoryOptions = (changedOptions: HistoryOptionsType) => {
    setHistoryOptions((prevHistoryOptions) => ({
      ...prevHistoryOptions,
      ...changedOptions,
    }));
  };

  const onOpenHistoryOptionsSettingDrawer = () => {
    // if (!storyTitle) {
    //   alert("Please enter a title");
    //   return;
    // }
    //
    // if (!content) {
    //   alert("Please enter a content");
    //   return;
    // }
    const joinedStoryTitle = storyTitle.split(" ").join("-");
    onChangeHistoryOptions({ url: joinedStoryTitle });
    setIsHistoryOptionsSettingDrawerOpened(true);
  };
  const onCloseHistoryOptionsSettingDrawer = () => setIsHistoryOptionsSettingDrawerOpened(false);

  // TODO: alert 제거 후 커스텀 메시지 생성
  const onSaveHistory = async () => {
    const response = await postFetch("/api/history", {
      title: storyTitle,
      content,
    });
    console.log("response", response);
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
