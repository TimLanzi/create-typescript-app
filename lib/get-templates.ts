import fs from 'fs';
import path from 'path';

export const TEMPLATES = [
  { title: "Default", description: "Bare-bones Express app with Jest, CORS, Eslint, and pre-configured Winston logger.", value: "default" },
  { title: "Primsa", description: "Default + Prisma", value: "prisma" },
  { title: "Mongoose", description: "Default + Mongoose", value: "mongoose" },
]

export function getTemplates() {
  return fs.readdirSync(path.join(__dirname, "../templates"), { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
}