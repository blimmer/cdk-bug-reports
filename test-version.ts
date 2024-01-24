import { spawnSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const version = process.argv[2];

// run through each and test
console.log(`Testing version ${version}`);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json")).toString()
);
packageJson.devDependencies["aws-cdk"] = version;
packageJson.dependencies["aws-cdk-lib"] = version;
writeFileSync(join(__dirname, "package.json"), JSON.stringify(packageJson));

spawnSync("npm", ["install"], { stdio: "inherit" });
const result = spawnSync("npx", ["cdk", "synth"], { stdio: "inherit" });

if (result.status === 0) {
  console.log(`Version ${version} works`);
  process.exit(0);
} else {
  console.log(`Version ${version} failed`);
  process.exit(1);
}
