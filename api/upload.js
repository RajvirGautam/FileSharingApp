import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // disable default body parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File parsing failed" });
    }

    // Access uploaded file
    const file = files.file[0];

    // ❌ fs.writeFile won't persist on Vercel
    // ✅ Instead: forward `file.filepath` to cloud storage

    return res.status(200).json({
      message: "File received",
      fileName: file.originalFilename,
      size: file.size,
    });
  });
}