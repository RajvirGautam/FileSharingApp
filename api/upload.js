// /api/upload.js
import formidable from "formidable";
import fs from "fs";
import cloudinary from "../../cloudinary"; // import config

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(500).json({ error: "Form parsing failed" });
      }

      try {
        const filePath = files.file.filepath; // Multer/formidable puts temp file here

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "file_sharing_app", // optional folder
        });

        // Delete local temp file
        fs.unlinkSync(filePath);

        res.status(200).json({ url: result.secure_url });
      } catch (uploadErr) {
        console.error("Upload error:", uploadErr);
        res.status(500).json({ error: "Cloudinary upload failed" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}