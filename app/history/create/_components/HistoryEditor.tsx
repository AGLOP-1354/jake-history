"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Editor from "@/src/components/editor";
import Preview from "@/src/components/preview";
import Button from "@/src/components/interactive/button";
import Drawer from "@/src/components/interactive/drawer";
import { getFetch, postFetch } from "@/src/lib/customFetch";
import uploadS3Image from "@/src/lib/actions/uploadS3Image";
import { TagType } from "@/src/lib/types/tag";
import { revalidateTags } from "@/src/lib/actions/revalidTag";

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
    tagNames: [],
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

    const joinedStoryTitle = storyTitle.split(" ").join("-");
    onChangeHistoryOptions({ url: joinedStoryTitle });
    setIsHistoryOptionsSettingDrawerOpened(true);
  };
  const onCloseHistoryOptionsSettingDrawer = () => setIsHistoryOptionsSettingDrawerOpened(false);

  const createTagList = async () => {
    try {
      const createdTagList: { data?: TagType[] } = await postFetch({
        url: "/api/tag/list",
        queryParams: { tagNames: historyOptions.tagNames },
      });

      if (!createdTagList?.data || !createdTagList.data.length) {
        alert("태그 리스트 생성에 실패했어요");
        return;
      }

      return createdTagList.data.map(({ id }) => id);
    } catch (error) {
      console.log(error);
    }
  };

  const validateUrl = async () => {
    if (!historyOptions.url) {
      alert("URL을 입력해주세요.");
      return false;
    }

    const isDuplicateHistory = await getFetch({
      url: "/api/history/one/validate-url",
      queryParams: { url: historyOptions?.url },
    });
    if (isDuplicateHistory) {
      alert("이미 존재하는 URL이 있어요. 다른 URL로 수정해주세요.");
      return false;
    }

    return true;
  };

  const onSaveHistory = async () => {
    try {
      const isValidUrl = await validateUrl();
      if (!isValidUrl) return;

      let imageUrl = "";
      let tagIds;

      if (historyOptions.tagNames && historyOptions.tagNames.length > 0) {
        const _tagIds = await createTagList();
        if (!_tagIds || _tagIds.length === 0) return;

        tagIds = _tagIds;
      }

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
          tagIds,
          imageUrl,
          ...historyOptions,
        },
      });

      await revalidateTags(["histories", "tagList", "historyCounts"]);

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
