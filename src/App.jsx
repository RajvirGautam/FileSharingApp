import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import "./App.css";

export default function App() {
  const [files, setFiles] = useState([]);

  return (
    <div className="app">
      <h1>📂 File Upload (Vercel + React)</h1>
      <FileUpload onUpload={setFiles} />
      <FileList files={files} />
    </div>
  );
}