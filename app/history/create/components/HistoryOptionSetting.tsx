"use client";

import Button from "@/src/components/interactive/button";
import VerticalDivider from "@/src/components/display/divider/VerticalDivider";
import Input from "@/src/components/interactive/input";
import Textarea from "@/src/components/interactive/textarea";

import classes from "../styles/historyOptionSetting.module.css";
import FileUpload from "@/src/components/interactive/fileUpload";
import TagCreateInput from "@/src/components/tag/TagCreateInput";

export type HistoryOptionsType = {
  file?: File | null;
  summary?: string;
  url?: string;
  categoryId?: string;
  tagIds?: string[];
};

type Props = {
  historyTitle: string;
  onCancel: () => void;
  onSubmit: () => void;
  historyOptions: HistoryOptionsType;
  onChangeHistoryOptions: (changedOptions: HistoryOptionsType) => void;
};

const HistoryOptionSetting = ({ historyTitle, onCancel, onSubmit, historyOptions, onChangeHistoryOptions }: Props) => {
  const { summary = "", url = "", categoryId = "", tagIds = [] } = historyOptions;

  const addTag = (newTagName: string) => {
    onChangeHistoryOptions({
      tagIds: [...tagIds, newTagName],
    });
  };

  const removeTag = (tagName: string) => {
    const removedTagList = tagIds.filter((tag) => tag !== tagName);
    onChangeHistoryOptions({
      tagIds: removedTagList,
    });
  };

  const onFileSelect = (_file: File) => {
    onChangeHistoryOptions({
      file: _file,
    });
  };

  return (
    <div className={classes.HistoryOptionSettingContainer}>
      <div className={classes.HistoryOptionSetting}>
        <div className={classes.historyPreview}>
          <div className={classes.container}>
            <h3 className={classes.title}>히스토리 미리보기</h3>
            <div className={classes.historyImagePreview}>
              <FileUpload onFileSelect={onFileSelect} />
            </div>
          </div>

          <div className={classes.container}>
            <h3 className={classes.historyOptions}>{historyTitle}</h3>
            <Textarea
              placeholder="히스토리를 짧게 소개해보세요."
              onChange={({ target: { value } }) => onChangeHistoryOptions({ summary: value })}
              value={summary}
              noResize={true}
              height={100}
              showLength
              maxLength={150}
            />
          </div>
        </div>

        <VerticalDivider margin={36} />

        <div className={classes.historyOptions}>
          <div className={classes.historyAdditionalOptionSettingSection}>
            <div className={classes.container}>
              <h3 className={classes.title}>URL 설정</h3>
              <Input
                onChange={({ target: { value } }) => onChangeHistoryOptions({ url: value })}
                value={url}
                prefix="/history/"
              />
            </div>
            <div className={classes.container}>
              <h3 className={classes.title}>카테고리 설정</h3>
              <div>카테고리 추가</div>
            </div>

            <div className={classes.container}>
              <h3 className={classes.title}>태그 설정</h3>
              <TagCreateInput tagList={tagIds} addTag={addTag} removeTag={removeTag} />
            </div>
          </div>

          <div className={classes.handlerButtons}>
            <Button type="default" onClick={onCancel}>
              취소
            </Button>
            <Button type="primary" onClick={onSubmit}>
              작성완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryOptionSetting;
