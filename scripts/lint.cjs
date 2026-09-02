/**
 * Lint entry point (`npm run lint`).
 *
 * typescript-eslint (pulled in by eslint-config-next) hard-throws on load when
 * the `typescript` package it resolves is >= 7: TypeScript 7 is the native
 * (Go) distribution and does not ship the JavaScript compiler API that
 * typescript-eslint (and its helper ts-api-utils) drive. Per the side-by-side
 * guidance linked in that error, this process resolves `typescript` to the
 * TypeScript 6.x copy nested inside the `lint-typescript` file: dependency
 * (tools/lint-typescript). Keeping it nested also keeps its binaries out of
 * node_modules/.bin, so `npx tsc` stays the project's TypeScript 7.0.2.
 *
 * The redirect applies only within this lint process (the wrapper is the
 * scope boundary); every other entry point — `npx tsc --noEmit`,
 * `next build`'s type step, the editor — uses the project's TypeScript 7.0.2.
 */
const Module = require("node:module");
const path = require("node:path");

const sidecarNodeModules = path.join(
  __dirname,
  "..",
  "node_modules",
  "lint-typescript",
);
const ts6Main = require.resolve("typescript", { paths: [sidecarNodeModules] });
const ts6Dir = path.dirname(ts6Main);

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request === "typescript") {
    request = ts6Main;
  } else if (request.startsWith("typescript/")) {
    request = path.join(ts6Dir, request.slice("typescript/".length));
  }
  return resolveFilename.call(this, request, parent, ...rest);
};

// eslint's bin self-executes the CLI on load and signals via process.exitCode.
// eslint 9 does not export "./bin/eslint.js"; derive the path from the
// exported entry point (.../lib/api.js).
require(
  path.join(path.dirname(require.resolve("eslint")), "..", "bin", "eslint.js"),
);
