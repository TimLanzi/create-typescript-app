import { execSync } from "child_process";
import path from "path";
import rimraf from "rimraf";

function isInGitRepository(): boolean {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: 'ignore' });
    return true
  } catch {}
  return false;
}

export function tryGitInit(root: string): boolean {
  let didInit = false;
  try {
    execSync('git --version', { stdio: 'ignore' });
    if (isInGitRepository()) {
      return false;
    }

    execSync('git init', { stdio: 'ignore' });
    didInit = true;

    execSync('git checkout -b main', { stdio: 'ignore' });
    execSync('git add -A', { stdio: 'ignore' });
    execSync('git commit -m "Initial commit"', { stdio: 'ignore' });
    
    return true;
  } catch {
    if (didInit) {
      try {
        rimraf.sync(path.join(root, '.git'));
      } catch {}
    }
    return false;
  }
}