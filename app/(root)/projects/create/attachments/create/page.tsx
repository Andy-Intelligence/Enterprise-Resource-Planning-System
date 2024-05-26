"use client"
import React, { useState } from "react";

const AttachmentForm = () => {
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentType, setAttachmentType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mimeType, setMimeType] = useState("");
  const [description, setDescription] = useState("");
  const [indexedContent, setIndexedContent] = useState("");
  const [website, setWebsite] = useState("");
  const [resourceModel, setResourceModel] = useState("Client");
  const [resourceField, setResourceField] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [isPublicDocument, setIsPublicDocument] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log({
      attachmentName,
      attachmentType,
      file,
      mimeType,
      description,
      indexedContent,
      website,
      resourceModel,
      resourceField,
      resourceId,
      resourceName,
      isPublicDocument,
    });
    // Reset form fields after submission if needed
    // setAttachmentName("");
    // setAttachmentType("");
    // setFile(null);
    // setMimeType("");
    // setDescription("");
    // setIndexedContent("");
    // setWebsite("");
    // setResourceModel("");
    // setResourceField("");
    // setResourceId("");
    // setResourceName("");
    // setIsPublicDocument(false);
  };

  return (
    <div className="flex flex-col p-8">
      <h2 className="text-lg font-semibold mb-4 ">Create Attachment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col ">
            <label className="text-sm font-semibold">Attachment Name</label>
            <input
              type="text"
              value={attachmentName}
              onChange={(e) => setAttachmentName(e.target.value)}
              className="border rounded-md px-4 py-2"
            />
            <label className="text-sm font-semibold mt-4">Type</label>
            <select
              value={attachmentType}
              onChange={(e) => setAttachmentType(e.target.value)}
              className="border rounded-md px-4 py-2"
            >
              {/* Options for attachment type */}
              <option value="image">Image</option>
              <option value="document">Document</option>
              <option value="video">Video</option>
              {/* Add more options as needed */}
            </select>
            <label className="text-sm font-semibold mt-4">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border rounded-md px-4 py-2"
            />
            <label className="text-sm font-semibold mt-4">Mime Type</label>
            <input
              type="text"
              value={mimeType}
              onChange={(e) => setMimeType(e.target.value)}
              className="border rounded-md px-4 py-2"
            />
            <label className="text-sm font-semibold mt-4">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md px-4 py-2"
            ></textarea>
            <label className="text-sm font-semibold mt-4">
              Indexed Content
            </label>
            <textarea
              value={indexedContent}
              onChange={(e) => setIndexedContent(e.target.value)}
              className="border rounded-md px-4 py-2"
            ></textarea>
            <label className="text-sm font-semibold mt-4">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="border rounded-md px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">Attached To</h3>
            <div className="border rounded-md px-4 py-2">
              <p>
                <span className="font-semibold">Resource Model:</span>{" "}
                {resourceModel}
              </p>
              <p>
                <span className="font-semibold">Resource Field:</span>{" "}
                {resourceField}
              </p>
              <p>
                <span className="font-semibold">Resource ID:</span> {resourceId}
              </p>
              <p>
                <span className="font-semibold">Resource Name:</span>{" "}
                {resourceName}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={isPublicDocument}
                  onChange={(e) => setIsPublicDocument(e.target.checked)}
                />
                <label>Is Resource Public Document</label>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 max-w-fit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttachmentForm;
