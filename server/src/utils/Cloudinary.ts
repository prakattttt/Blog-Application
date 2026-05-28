import { v2 as cloudinary } from "cloudinary";
import { cloudinary_config } from "../config/env.js";

cloudinary.config(cloudinary_config);

export default cloudinary;
