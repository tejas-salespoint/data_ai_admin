/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";

import { TextEditor } from "./TextEditor";
import { markdownToHtml } from "./Parser";

export default function MainTextEditor({ value, setValue, label }) {
  const [editorHtmlValue, setEditorHtmlValue] = useState(value);

  useEffect(() => {
    setEditorHtmlValue(value);
  }, [value]);
  const [editorMarkdownValue, setEditorMarkdownValue] = useState("");

  // useEffect(() => {
  //   setInitialMarkdownContent(markdownToHtml(value));
  // }, [value]);

  const onEditorContentChanged = (content) => {
    setEditorHtmlValue(content.html);
    setEditorMarkdownValue(content.markdown);
    setValue(content.html);
  };

  return (
    <div className="sm:col-span-2">
      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
       {label}
      </div>
      <TextEditor
        valueProp={editorHtmlValue}
        onChangeProp={onEditorContentChanged}
      />
    </div>
  );
}
