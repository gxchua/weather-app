/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  roots: ["<rootDir>/src"],
  //setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], //Used for extra configuration if needed # For example delay
  moduleFileExtensions: ["ts", "tsx", "js"],
  testPathIgnorePatterns: ["node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "\\.(css|less|scss|sass)$": "jest-transform-stub"
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    //Define path alias for jest
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mocks out all these file formats when tests are run
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
};

export default config;
