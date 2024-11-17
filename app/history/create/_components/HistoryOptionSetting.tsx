"use client";
import { useState } from "react";
import classNames from "classnames";

import Button from "@/src/components/interactive/button";
import VerticalDivider from "@/src/components/display/divider/VerticalDivider";
import Textarea from "@/src/components/interactive/textarea";
import FileUpload from "@/src/components/interactive/fileUpload";
import Input from "@/src/components/interactive/input";
import { CategoryType } from "@/src/lib/types/category";
import { createCategory } from "@/src/lib/actions/category";
import { revalidateTag } from "@/src/lib/actions/revalidTag";

import classes from "../styles/historyOptionSetting.module.css";

export type HistoryOptionsType = {
  file?: File | null;
  summary?: string;
  categoryId?: string;
};

type Props = {
  onCancel: () => void;
  onSubmit: () => void;
  historyOptions: HistoryOptionsType;
  onChangeHistoryOptions: (changedOptions: HistoryOptionsType) => void;
  categories: CategoryType[];
  isEditMode?: boolean;
};

const HistoryOptionSetting = ({
  onCancel,
  onSubmit,
  historyOptions,
  onChangeHistoryOptions,
  categories,
  isEditMode = false,
}: Props) => {
  const { summary = "", categoryId = "" } = historyOptions;
  const [newCategory, setNewCategory] = useState("");

  const onFileSelect = (_file: File) => {
    onChangeHistoryOptions({
      file: _file,
    });
  };

  const onCategoryCreate = async (name: string) => {
    await createCategory(name);
    await revalidateTag("categories");
  };

  const handleCategoryCreate = async () => {
    if (!newCategory.trim()) return;

    await onCategoryCreate(newCategory);
    setNewCategory("");
  };

  return (
    <div className={classes.HistoryOptionSettingContainer}>
      <div className={classes.HistoryOptionSetting}>
        <div className={classes.historyPreview}>
          <div className={classes.container}>
            <h3 className={classes.title}>히스토리 미리보기</h3>
            <div className={classes.historyImagePreview}>
              <FileUpload onFileSelect={onFileSelect} defaultFile={historyOptions.file || undefined} />
            </div>
          </div>

          <div className={classes.container}>
            <h3 className={classes.historyOptions}>설명</h3>
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
              <h3 className={classes.title}>카테고리 설정</h3>

              <div className={classes.categoryList}>
                <div className={classes.createCategoryInput}>
                  <Input
                    placeholder="카테고리 추가"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button type="primary" size="medium" onClick={handleCategoryCreate}>
                    추가
                  </Button>
                </div>
                <div className={classes.categoryList}>
                  {categories?.map(({ id, name }) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                      key={id}
                      onClick={() => onChangeHistoryOptions({ categoryId: id })}
                      className={classNames(classes.categoryItem, {
                        [classes.selectedCategoryItem]: id === categoryId,
                      })}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.handlerButtons}>
            <Button type="default" onClick={onCancel}>
              취소
            </Button>
            <Button type="primary" onClick={onSubmit}>
              {isEditMode ? "수정완료" : "작성완료"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryOptionSetting;
