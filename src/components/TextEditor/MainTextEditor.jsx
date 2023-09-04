/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import {  useEffect, useState } from "react";

import { TextEditor } from "./TextEditor";
import { markdownToHtml } from "./Parser";

export default function MainTextEditor({value,setValue}) {
  const [editorHtmlValue, setEditorHtmlValue] =  useState(value);

  useEffect(() => {
    setEditorHtmlValue(value)
    
  },[value])
  const [editorMarkdownValue, setEditorMarkdownValue] = useState("");

  // useEffect(() => {
  //   setInitialMarkdownContent(markdownToHtml(value));
  // }, [value]);

  const onEditorContentChanged = (content) => {
    setEditorHtmlValue(content.html);
    setEditorMarkdownValue(content.markdown);
    setValue(content.html)
   
  };



  return (
    <div className="sm:col-span-2">
      <TextEditor
     
        valueProp={editorHtmlValue}
        onChangeProp={onEditorContentChanged}
      />

    </div>
  );
}
