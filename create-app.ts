import path from "path";
import fs from "fs";
import os from "os";
import cpy from "cpy";
import chalk from "chalk";
import { tryGitInit } from "./lib/git";
import { PackageManager } from "./lib/get-package-manager";
import { isWriteable } from "./lib/is-writeable";
import { getOnline } from "./lib/is-online";
import { install } from "./lib/install";
import { isFolderEmpty } from "./lib/is-folder-empty";

export async function createApp({
  appPath,
  packageManager,
  template,
}:{
  appPath: string,
  packageManager: PackageManager,
  template?: string,
}): Promise<void> {
  // TODO if template
  if (!template) {
    template = 'default';
  }

  if (!fs.existsSync(path.join(__dirname, 'templates', template))) {
    console.error(`${chalk.red('Cannot create project')}. Template path ${chalk.cyan(template)} does not exist.`);
    console.log();
    process.exit(1);
  }

  const root = path.resolve(appPath);
  if (!(await isWriteable(path.dirname(root)))) {
    console.error("The application path is not writable, please check folder permissions and try again.");
    console.error("It is likely you do not have write permissions for this folder");
    process.exit(1);
  }

  const appName = path.basename(root);
  await fs.promises.mkdir(appName, { recursive: true });

  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = packageManager === "yarn";
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  console.log(`Creating a new TypeScript app in ${chalk.green(root)}`);
  console.log();

  process.chdir(root);

  await cpy("**", root, {
    parents: true,
    cwd: path.join(__dirname, 'templates', template),
    rename: name => {
      switch (name) {
        case 'gitignore':
        case 'env':
        case 'eslintignore':
        case 'eslintrc.js': {
          return '.'.concat(name);

        }
        default:
          return name;
      }
    },
  });

  await install(root, packageManager, isOnline);

  if (tryGitInit(root)) {
    console.log('Initialized a git repository.');
    console.log();
  }

  let cdpath: string
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName
  } else {
    cdpath = appPath
  }
  console.log("CDPATH: ", cdpath);

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`)
  console.log('Inside that directory, you can run several commands:')
  console.log()
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? '' : 'run '}dev`))
  console.log('    Starts the development server.')
  console.log()
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? '' : 'run '}build`))
  console.log('    Builds the app for production.')
  console.log()
  console.log(chalk.cyan(`  ${packageManager} start`))
  console.log('    Runs the built app in production mode.')
  console.log()
  console.log(chalk.cyan(`  ${packageManager} test`))
  console.log("    Runs the app's unit tests using Jest.")
  console.log()
  console.log(chalk.cyan(`  ${packageManager} test:coverage`))
  console.log("    Runs the app's unit tests with coverage using Jest.")
  console.log()
  console.log(chalk.cyan(`  ${packageManager} lint`))
  console.log("    Runs the app's ESLint.")
  console.log()
  console.log('Get started with:')
  console.log()
  console.log(chalk.cyan('  cd'), cdpath)
  console.log(
    `  ${chalk.cyan(`${packageManager} ${useYarn ? '' : 'run '}dev`)}`
  )
  console.log()
}