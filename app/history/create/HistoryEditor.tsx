'use client';
import React, { useState } from 'react';

import Editor from '@/src/components/editor';

import './HistoryEditor.css';

function VelogStyleEditor() {
  const [storyTitle, setStoryTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="editorContainer">
      <div className="eidtor">
        <input
          type="text"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          placeholder="스토리의 제목을 적어주세요"
          className="storyTitleInput"
        />
        <Editor content={content} onChange={setContent} />
      </div>

      <div className="preview">
        this is preview section
      </div>
    </div>
  );
}

export default VelogStyleEditor;