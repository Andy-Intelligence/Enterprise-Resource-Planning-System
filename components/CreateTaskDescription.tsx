// "use client";
// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import hljs from "highlight.js";
// import "highlight.js/styles/github.css";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["blockquote", "code-block"],
//     [{ align: [] }],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
//   clipboard: {
//     matchVisual: false,
//   },
//   syntax: {
//     highlight: (text: any) => hljs.highlightAuto(text).value,
//   },
// };

// const CreateTaskDescription = () => {
//   const [editorHtml, setEditorHtml] = useState("");
//   const [value, setValue] = useState("");

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "color",
//     "background",
//     "list",
//     "bullet",
//     "ordered",
//     "blockquote",
//     "code-block",
//     "align",
//     "link",
//     "image",
//     "video",
//   ];

//   const handleEditorChange = (html: any) => {
//     setEditorHtml(html);
//   };

//   return (
//     <div className="h-fit ">
//       <ReactQuill
//         //   style={{height:"4rem"}}
//         theme="snow"
//         // value={editorHtml}
//         // onChange={handleEditorChange}
//         value={value}
//         onChange={setValue}
//         modules={modules}
//         formats={formats}
//         className="min-h-10"
//       />
//     </div>
//   );
// };

// export default CreateTaskDescription;

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // Use dynamic import for ReactQuill and disable SSR

import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  syntax: {
    highlight: (text: any) => hljs.highlightAuto(text).value,
  },
};

const CreateTaskDescription = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [value, setValue] = useState("");

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "ordered",
    "blockquote",
    "code-block",
    "align",
    "link",
    "image",
    "video",
  ];

  const handleEditorChange = (html: any) => {
    setEditorHtml(html);
  };

  useEffect(() => {
    // This code runs only on the client-side
    // You can add any client-side specific logic here
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div className="h-fit">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        className="min-h-10"
      />
    </div>
  );
};

export default CreateTaskDescription;
