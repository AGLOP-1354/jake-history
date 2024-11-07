import React, { useLayoutEffect, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

import "./editor.css";

const MarkdownEditor = ({ onChange }: { onChange: (html: string) => void }) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    if (editorRef.current) {
      const html = editorRef.current.getInstance().getHTML();
      onChange(html);
    }
  };

  useLayoutEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown("");
    }
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
      <Editor
        ref={editorRef}
        previewStyle="none"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={handleChange}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        theme="dark"
        placeholder="Write your story here..."
      />
    </div>
  );
};

export default MarkdownEditor;
