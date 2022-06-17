#!/usr/bin/env node
import path from "path";
import chalk from "chalk";
import Commander from "commander";
import prompts from 'prompts';
import packageJson from "./package.json";
import { getPkgManager } from "./lib/get-package-manager";
import { getTemplates } from "./lib/get-templates";
import { createApp } from "./create-app";
import { validateNpmName } from "./lib/validate-pkg";

let projectPath = '';

const templates = getTemplates();

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectPath = name
  })
  .option(
    '--use-npm',
    `
  Explicitly tell the CLI to bootstrap the app using npm
  `
  )
  .option(
    '--use-pnpm',
    `
  Explicitly tell the CLI to bootstrap the app using pnpm
  `
  )
  .option('-t, --template <template>',
  `

  The template you would like to use for your project.
  
  Existing templates:
  ` + templates.map(t => `  - ${t}\n`)
  )
  .allowUnknownOption()
  .parse(process.argv);

async function run(): Promise<void> {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim()
  }

  if (!projectPath) {
    const res = await prompts({
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "api",
      validate: (name) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return 'Invalid project name: ' + validation.problems![0];
      }
    });

    if (typeof res.path === "string") {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${chalk.cyan(program.name())} ${chalk.green(
          '<project-directory>'
        )}\n\n` +
        'For example:\n' +
        `  ${chalk.cyan(program.name())} ${chalk.green('my-next-app')}\n\n` +
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    )
    process.exit(1)
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validateNpmName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(`"${projectName}"`)} because of npm naming restrictions:`
    );

    problems!.forEach(p => console.error(`  ${chalk.red.bold("*")} ${p}`));
    process.exit(1);
  }

  const packageManager = !!program.useNpm
    ? 'npm'
    : !!program.usePnpm
    ? 'pnpm'
    : getPkgManager();

  const template = typeof program.template === "string" && program.template.trim();

  try {
    await createApp({
      appPath: resolvedProjectPath,
      packageManager,
      template: !!template ? template : "default",
    })
  } catch(reason) {
    throw reason;
  }
}

run()
  .catch(async(reason) => {
    console.log("Aborting...");
    if (reason.command) {
      console.log(`${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:") + '\n', reason)
    }
    console.log();

    process.exit(1);
  });