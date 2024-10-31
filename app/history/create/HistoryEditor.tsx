'use client';
import React, { useState } from 'react';
import Editor from '@/src/components/editor';
import Preview from "@/src/components/preview";

import './HistoryEditor.css';

const HistoryEditor = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [content, setContent] = useState('');

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
      </div>

      <Preview content={content} storyTitle={storyTitle} />
    </div>
  );
}

export default HistoryEditor;
