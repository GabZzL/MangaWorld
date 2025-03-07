import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

interface CloudinaryStorageParams {
  folder: string;
  format?: string | (() => string);
  public_id?: (req: Express.Request, file: Express.Multer.File) => string;
  transformation?: Array<{ width?: number; height?: number; crop?: string }>;
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "manga_covers",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 700, crop: "limit" }],
  } as CloudinaryStorageParams,
});

const upload = multer({ storage });

export default upload;
