export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  import formidable from "formidable";
  import fs from "fs";
  
  export default async function handler(req, res) {
    if (req.method === "POST") {
      const form = new formidable.IncomingForm();
  
      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({ error: "Upload failed" });
          return;
        }
  
        const file = files.file[0];
        const fileName = file.originalFilename;
  
        // ❌ NOTE: Vercel serverless cannot persist files.
        // ✅ Instead: upload to S3, Cloudinary, or similar.
        res.status(200).json({
          name: fileName,
          url: `/uploads/${fileName}`, // placeholder
        });
      });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }