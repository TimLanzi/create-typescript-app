import fs from 'fs';
import path from 'path';

export const TEMPLATES = [
  { title: "Default", description: "Bare-bones Express app with Jest, CORS, ESLint, and pre-configured Winston logger.", value: "default" },
  { title: "Primsa", description: "Default + Prisma", value: "prisma" },
  { title: "Mongoose", description: "Default + Mongoose", value: "mongoose" },
  { title: "Apollo Server", description: "Bare-bones Apollo Server app with Jest, ESLint, and pre-configured Winston logger", value: "apollo-server" },
]

export function getTemplates() {
  return fs.readdirSync(path.join(__dirname, "../templates"), { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
}