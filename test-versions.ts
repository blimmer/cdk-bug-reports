import { execSync, spawnSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const versions = [
  "2.96.2",
  "2.97.0",
  "2.97.1",
  "2.98.0",
  "2.99.0",
  "2.99.1",
  "2.100.0",
  "2.101.0",
  "2.101.1",
  "2.102.0",
  "2.102.1",
  "2.103.0",
  "2.103.1",
  "2.104.0",
  "2.105.0",
  "2.106.0",
  "2.106.1",
  "2.107.0",
  "2.108.0",
  "2.108.1",
  "2.109.0",
  "2.110.0",
  "2.110.1",
  "2.111.0",
  "2.112.0",
  "2.113.0",
  "2.114.0",
  "2.114.1",
  "2.115.0",
  "2.116.0",
  "2.116.1",
  "2.117.0",
  "2.118.0",
  "2.119.0",
  "2.120.0",
  "2.121.0",
  "2.121.1",
  "2.122.0",
];

// run through each and test
for (const version of versions) {
  console.log("*******************");
  console.log(`Testing version ${version}`);
  spawnSync("git", ["clean", "-fdx"]);
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
    break;
  } else {
    console.log(`Version ${version} failed`);
  }
  console.log("*******************");
}
