'use client'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor/dist/ckeditor';

import './editor.css';

type Props = {
  content: string;
  onChange: (changedContent: string) => void;
}

const Editor = ({ content, onChange }: Props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      config={{
        placeholder: "여기에 스토리를 적어주세요...",
        toolbar: [
          'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'codeBlock', '|', 'undo', 'redo'
        ],
        language: 'ko'
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      onReady={handleEditorReady}
    />
  )
}

export default Editor;
