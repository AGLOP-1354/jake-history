import React, { useLayoutEffect, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import uploadS3Image from "@/src/lib/actions/uploadS3Image";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "highlight.js/styles/atom-one-dark.css";

import "./editor.css";

const MarkdownEditor = ({ onChange }: { onChange: (html: string) => void }) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      const markdown = instance.getMarkdown();
      onChange(markdown);
    }
  };

  useLayoutEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown("");
    }
  }, []);

  const onUploadImage = async (blob: Blob | File, callback: (url: string, alt: string) => void) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);

      const imageUrl = await uploadS3Image(formData);
      if (!imageUrl) {
        throw new Error("이미지 업로드 실패");
      }

      callback(imageUrl, blob instanceof File ? blob.name : "image");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
      <Editor
        ref={editorRef}
        previewStyle="none"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={handleChange}
        plugins={[codeSyntaxHighlight]}
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
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
