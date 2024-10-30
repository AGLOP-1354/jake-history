'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        placeholder: "여기에 스토리를 적어주세요...",
        toolbar: [
          'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
          'insertTable', 'mediaEmbed', 'undo', 'redo'
        ],
      }}
  />
  )
}

export default Editor;