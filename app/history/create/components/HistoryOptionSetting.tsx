"use client";

import Button from "@/src/components/interactive/button";
import VerticalDivider from "@/src/components/display/divider/VerticalDivider";
import Input from "@/src/components/interactive/input";
import Textarea from "@/src/components/interactive/textarea";

import classes from "../styles/historyOptionSetting.module.css";

export type HistoryOptionsType = {
  image?: string;
  summary?: string;
  url?: string;
  category?: string;
  tagList?: string[];
};

type Props = {
  historyTitle: string;
  onCancel: () => void;
  onSubmit: () => void;
  historyOptions: HistoryOptionsType;
  onChangeHistoryOptions: (changedOptions: HistoryOptionsType) => void;
};

const HistoryOptionSetting = ({ historyTitle, onCancel, onSubmit, historyOptions, onChangeHistoryOptions }: Props) => {
  const { image = "", summary = "", url = "", category = "", tagList = [] } = historyOptions;

  return (
    <div className={classes.HistoryOptionSettingContainer}>
      <div className={classes.HistoryOptionSetting}>
        <div className={classes.historyPreview}>
          <div className={classes.container}>
            <h3 className={classes.title}>히스토리 미리보기</h3>
            <div className={classes.historyImagePreview}>이미지 업로드 섹션</div>
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
