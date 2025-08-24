import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing file" });
      }

      const file = files.file;

      try {
        const uploadRes = await cloudinary.uploader.upload(file.filepath, {
          folder: "vercel_uploads", // optional folder name
        });

        return res.status(200).json({
          message: "File uploaded successfully",
          url: uploadRes.secure_url,
        });
      } catch (e) {
        return res.status(500).json({ error: "Upload failed", details: e });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}