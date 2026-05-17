const PORT: number = Number(process.env["PORT"]) || 5000;

const DB_URL: string = process.env["DB_URL"] || "";

const secretAToken: string = process.env["ACCESS_TOKEN_SECRET"] as string; 

const env: string = process.env["NODE_ENV"] as string;

export { PORT, DB_URL, secretAToken, env };