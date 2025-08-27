// controllers/mainImages.js
import path from "path"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function uploadMainImage(req, res) {

try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" })
    }

    // Get file from request
    const uploadedFile = req.files.uploadedFile

    // Generate random number 
    const randomSuffix = Math.floor(Math.random() * 1000000); // e.g., 234523
    const originalName = uploadedFile.name.replace(/\s+/g, "_");
    const newFileName = `${randomSuffix}_${originalName}`;
    
    const uploadDir = path.join(process.cwd(), process.env.UPLOADS_DIR)
    const uploadPath = path.join(uploadDir, newFileName)

    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.error("Upload Error:", err)
        return res.status(500).send(err)
      }
      res.status(200).json({ message: "File Uploaded Successfully", fileName: newFileName })
    })
  } catch (error) {
    console.error("Unexpected upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}
