import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css"; // Import table CSS
import './style.css';
import { modules, formats } from "./Module";

const Editor = ({ setEditItem, content }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleEditorChange = (content) => {
    setEditItem((prev) => ({ ...prev, Content: content }));
  };

  return (
    <div className="editor-container">
      <ReactQuill 
        theme="snow"
        value={content}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        placeholder="Write something awesome..."
      />
    </div>
  );
};

export default Editor;