const PORT: number = Number(process.env["PORT"]) || 5000;

const DB_URL: string = process.env["DB_URL"] || "";

const secretAToken: string = process.env["ACCESS_TOKEN_SECRET"] as string; 

const env: string = process.env["NODE_ENV"] as string;

const cloudinary_config: { cloud_name: string, api_key: string, api_secret: string } = {
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
    api_key: process.env["CLOUDINARY_API_KEY"],
    api_secret: process.env["CLOUDINARY_API_SECRET"] 
} as { cloud_name: string, api_key: string, api_secret: string };

export { PORT, DB_URL, secretAToken, env, cloudinary_config };