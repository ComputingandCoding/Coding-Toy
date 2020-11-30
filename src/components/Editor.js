import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

export default function Editor({ displayName, value, onChange, language }) {
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="ec-btn"
          onClick={() => {
            setOpen((prevOpen) => !prevOpen);
          }}
        >
          {open ? (
            <i class="fas fa-compress-alt"></i>
          ) : (
            <i class="fas fa-expand-alt"></i>
          )}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
}
