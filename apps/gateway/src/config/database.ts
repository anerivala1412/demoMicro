import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  type: "mongoose",
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE_URL,
}));
