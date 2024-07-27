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

// Define the interface for the props
interface CreateDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

const CreateDescription: React.FC<CreateDescriptionProps> = ({
  value,
  onChange,
}) => {
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

  useEffect(() => {
    // This code runs only on the client-side
    // You can add any client-side specific logic here
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div className="h-fit">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="min-h-10"
      />
    </div>
  );
};

export default CreateDescription;
