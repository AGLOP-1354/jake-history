'use client';

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const HistoryEditor = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // 클라이언트 사이드에서 HTML 콘텐츠를 설정하고 나서 하이라이팅을 적용
    setContent(`
      <pre><code class="language-html">
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;&lt;/head&gt;
          &lt;body&gt;
            &lt;h1&gt;Hello World&lt;/h1&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      </code></pre>
    `);

    // setTimeout으로 DOM 업데이트 후 Prism 하이라이팅 적용
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);

  return (
    <div className="editorContainer">
      <div className="preview">
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default HistoryEditor;
