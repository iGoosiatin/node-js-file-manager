import { readdir } from 'node:fs/promises';
import { resolve } from "path";
import { homedir } from "os";

export default class NavigationHandler {
  up() {
    process.chdir("..");
  };

  async ls() {
    const items = await readdir(process.cwd(), { withFileTypes: true });
    const files = items
      .filter(item => item.isFile())
      .map(file => ({ name: file.name, type: "file" }))
      .sort((fileA, fileB) => fileA.name.localeCompare(fileB.name));
    const directories = items
      .filter(item => item.isDirectory())
      .map(dir => ({ name: dir.name, type: "directory" }))
      .sort((dirA, dirB) => dirA.name.localeCompare(dirB.name));

    console.table([...directories, ...files]);
  };

  cd(dir) {
    const supportHomeDir = dir.replace(/^~/, homedir());
    const targetDir = resolve(process.cwd(), supportHomeDir);
    process.chdir(targetDir);
  }
}
