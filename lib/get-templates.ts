import fs from 'fs';
import path from 'path';

export function getTemplates() {
  return fs.readdirSync(path.join(__dirname, "../templates"), { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
}