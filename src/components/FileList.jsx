import React from "react";

export default function FileList({ files }) {
  if (files.length === 0) return <p>No files uploaded yet.</p>;

  return (
    <ul>
      {files.map((file, i) => (
        <li key={i}>
          <a href={file.url} target="_blank" rel="noreferrer">
            {file.name}
          </a>
        </li>
      ))}
    </ul>
  );
}