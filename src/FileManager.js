import { createInterface } from "readline/promises";
import { EOL } from "os";

export default class FileManager {
  constructor(username) {
    this.username = username || "Anonymous";
    this.rl = createInterface(process.stdin);
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    console.log(`You are currently in ${process.cwd()}`);

    this.rl.on("line", (line) => {
      console.log(`You are currently in ${process.cwd()}`);
    });

    process.on('exit', () => {
      console.log(`${EOL}Thank you for using File Manager, ${this.username}, goodbye!`);
    });

    process.on('SIGINT', () => {
      process.exit();
    });
  }
}