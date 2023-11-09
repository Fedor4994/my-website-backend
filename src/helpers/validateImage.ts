import { UploadedFile } from "express-fileupload";
import { RequestError } from "./RequestError";

export const validateImage = (image: UploadedFile) => {
  if (!image) {
    throw RequestError(400, "Image is required");
  }

  if (Array.isArray(image)) {
    throw RequestError(400, "Add single image for poster");
  }

  const mimetype = image.mimetype.split("/")[1];

  if (mimetype !== "jpeg" && mimetype !== "jpg" && mimetype !== "png") {
    throw RequestError(400, "File must be an image");
  }

  if (image.size > 5000000) {
    throw RequestError(400, "File size must be less than 5MB");
  }
};
