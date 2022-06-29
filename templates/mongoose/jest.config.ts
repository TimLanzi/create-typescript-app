import type { Config } from '@jest/types';

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const config: Config.InitialOptions = {
  preset: "ts-jest",
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
  maxWorkers: 4,
  testEnvironment: "node",
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/__test__/"],
  globalSetup: "<rootDir>/__test__/global-setup.ts",
  // globalTeardown: "<rootDir>/__test__/global-teardown.ts",
  // setupFilesAfterEnv: ["<rootDir>/__test__/setup.ts"],
  testPathIgnorePatterns: ["db.ts", "mocks/*", "queries/*"],
};

export default config;