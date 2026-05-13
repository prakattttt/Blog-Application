const PORT: number = Number(process.env["PORT"]) || 5000;
const DB_URL: string = process.env["DB_URL"] || "";

export { PORT, DB_URL };