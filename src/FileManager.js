import { createInterface } from "readline";
import { EOL, homedir } from "os";
import OperationsManager from "./OperationsManager.js";

export default class FileManager {
  constructor(username) {
    this.username = username || "Anonymous";
    this.rl = createInterface(process.stdin);
    this.operationsManager = new OperationsManager;
  }

  start() {
    console.clear();
    console.log(`Welcome to the File Manager, ${this.username}!`);
    process.chdir(homedir());
    console.log(`You are currently in ${process.cwd()}`);

    this.rl.on("line", (input) => {
      if (input) {
        this.operationsManager
        .handleOperation(input)
        .catch((error) => console.log(error.message))
        .finally(() => console.log(`You are currently in ${process.cwd()}`));
      }
    });

    process.on('exit', () => {
      console.log(`${EOL}Thank you for using File Manager, ${this.username}, goodbye!`);
    });

    process.on('SIGINT', () => {
      process.exit();
    });
  }
}
