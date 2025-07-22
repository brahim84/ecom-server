// controllers/mainImages.js
import path from "path"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function uploadMainImage(req, res) {
  console.log("---here-1--")
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files uploaded" })
  }

  // Get file from request
  const uploadedFile = req.files.uploadedFile
  const uploadDir = path.join(process.cwd(), "public")
  const uploadPath = path.join(uploadDir, uploadedFile.name)

  console.log("---uploadedFile---", uploadedFile, uploadDir, uploadPath)
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      console.error("Upload Error:", err)
      return res.status(500).send(err)
    }
    res.status(200).json({ message: "File Uploaded Successfully", fileName: uploadedFile.name })
  })
}
