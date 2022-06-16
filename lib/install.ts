import chalk from "chalk";
import { spawn } from "cross-spawn";
import { PackageManager } from "./get-package-manager";

export function install(
  root: string,
  packageManager: PackageManager,
  isOnline: boolean,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let args: string[];
    let command = packageManager;
    const useYarn = packageManager === 'yarn';

    args = ['install']
    if (!isOnline) {
      console.log(chalk.yellow('You appear to be offline.'))
      if (useYarn) {
        console.log(chalk.yellow('Falling back to the local Yarn cache.'))
        console.log()
        args.push('--offline')
      } else {
        console.log()
      }
    }

    // TODO add package manager specific flags if necessary

    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    });
    
    child.on('close', code => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` });
        return;
      }
      resolve();
    });
  });
}