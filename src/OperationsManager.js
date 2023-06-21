import NavigationHandler from "./OperationHandlers/NavigationHandler.js";
import { ERR_INVALID_INPUT, ERR_OPERATION_FAILED } from "./errors.js";

export default class OperationsManager {
  constructor () {
    this.navigationHandler = new NavigationHandler();
  };

  async handleOperation(input){
    const [operation, ...args] = input.split(" ");
    try {
      switch (operation) {
        case "up":
          {
            this.navigationHandler.up();
            break;
          }
        case "ls":
          {
            await this.navigationHandler.ls();
            break;
          }
        case "cd":
          {
            if (args.length > 1) {
              throw new Error();
            }
            this.navigationHandler.cd(args[0]);
            break;
          }
        case "cat":
        case "add":
        case "rn":
        case "cp":
        case "mv":
        case "rm":
        case "os":
        case "hash":
        case "compress":
        case "decomppress":
        case ".exit": {
          process.exit();
        }
        default:
          console.log(ERR_INVALID_INPUT);
      }
    }
      catch {
        console.log(ERR_OPERATION_FAILED);
    }
  }
}