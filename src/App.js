import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import useLocalStorage from "./components/hooks/useLocalStorage";

export default function App() {
  const display = document.querySelector(".display");
  const toppane = document.querySelector(".top-pane");

  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>`);
    }, 250);
    return () => clearTimeout(timeOut);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          className="code-mirror-wrapper"
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          className="code-mirror-wrapper"
        />
        <Editor
          language="javascript"
          displayName="JAVASCRIPT"
          value={js}
          onChange={setJs}
          className="code-mirror-wrapper"
        />
      </div>
      <div className="pane">
        <button
          className="full"
          onClick={() => {
            display.classList.toggle("fullscreen");
            toppane.classList.toggle("less");
          }}
        >
          <i className="fas fa-expand"></i>
        </button>
        <iframe
          className="display"
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
}
