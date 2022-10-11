const { pathsToModuleNameMapper } = require("ts-jest/dist/config");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};
