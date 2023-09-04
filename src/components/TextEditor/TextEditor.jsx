/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

import './main.css'
import { htmlToMarkdown, markdownToHtml } from "./Parser";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],

  ["clean"],
];

export function TextEditor({ valueProp, onChangeProp }) {
  const [value, setValue] = useState(markdownToHtml(valueProp));

  useEffect(() => {
    setValue(valueProp)
  },[valueProp])
 
  const reactQuillRef = useRef(null);

  const onChange = (content) => {
    setValue(content);

    if (onChangeProp) {
      onChangeProp({
        html: content,
        markdown: htmlToMarkdown(content),
      });
    }
  };

  return (
    <>
      <ReactQuill
      style={{
        '.ql-toolbar.ql-snow': {
          border: '1px solid #cccsdf !important',
          boxSizing: 'border-box',
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          padding: '8px',
        },
      }}
        className="block p-2.5 w-full text-sm text-white 
       rounded-lg  bg-gray-700 placeholder-red-600"
        ref={reactQuillRef}
        // placeholder="Start writing..."
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
          },
          "emoji-textarea": false,
        }}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
