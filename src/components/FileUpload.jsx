import React, { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [selected, setSelected] = useState(null);

  const handleFileChange = (e) => {
    setSelected(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selected) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("file", selected);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onUpload((prev) => [...prev, data]);
    setSelected(null);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}