import { createInterface } from "readline/promises";
import { EOL } from "os";

export default class FileManager {
  constructor(username) {
    this.username = username || "Anonymous";
    this.rl = createInterface(process.stdin);
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.username}!`);

    this.rl.on("line", (line) => {
      console.log(`My line: ${line}`);
    });

    process.on('exit', () => {
      console.log(`${EOL}Thank you for using File Manager, ${this.username}, goodbye!`);
    });

    process.on('SIGINT', () => {
      process.exit();
    });
  }
}