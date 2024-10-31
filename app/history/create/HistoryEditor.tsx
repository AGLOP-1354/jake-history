'use client';
import React, { useState } from 'react';
import Link from "next/link";

import Editor from '@/src/components/editor';
import Preview from "@/src/components/preview";
import Button from "@/src/components/interactive/button";
import { postFetch } from '@/src/lib/customFetch';

import './HistoryEditor.css';

const HistoryEditor = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [content, setContent] = useState('');

  // TODO: alert 제거 후 커스텀 메시지 생성
  const onSaveHistory = async () => {
    if (!storyTitle) {
      alert('Please enter a title');
      return;
    }

    if (!content) {
      alert('Please enter a content');
      return;
    }

    const response = await postFetch('/api/history', {
      title: storyTitle,
      content,
    });
    console.log('response', response);
  }

  return (
    <div className="editorContainer">
      <div className="editor">
        <input
          type="text"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          placeholder="제목을 적어주세요."
          className="storyTitleInput"
        />
        <Editor content={content} onChange={setContent} />

        <div className="historyHandler">
         <Link href="/" className="prevButton">나가기</Link>

          <Button type="primary" onClick={onSaveHistory}>작성완료</Button>
        </div>
      </div>

      <Preview content={content} storyTitle={storyTitle} />
    </div>
  );
}

export default HistoryEditor;
