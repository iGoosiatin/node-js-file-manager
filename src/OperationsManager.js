import NavigationHandler from "./OperationHandlers/NavigationHandler.js";
import OSHandler from "./OperationHandlers/OSHandler.js";
import HashHandler from "./OperationHandlers/HashHandler.js";
import { ERR_INVALID_INPUT, ERR_OPERATION_FAILED } from "./errors.js";

export default class OperationsManager {
  constructor () {
    this.navigationHandler = new NavigationHandler();
    this.osHandler = new OSHandler();
    this.hashHandler = new HashHandler();
  };

  async handleOperation(input) {
    const [operation, ...args] = input.split(" ");
    try {
      switch (operation) {
        case "up": {
          this._validateNumberOfArgs(args, 0);
          this.navigationHandler.up();
          break;
        }
        case "ls": {
          this._validateNumberOfArgs(args, 0);
          await this.navigationHandler.ls();
          break;
        }
        case "cd": {
          this._validateNumberOfArgs(args, 1);
          const [targetDir] = args;
          this.navigationHandler.cd(targetDir);
          break;
        }
        case "cat":
        case "add":
        case "rn":
        case "cp":
        case "mv":
        case "rm": {
          break;
        }
        case "os": {
          this._validateNumberOfArgs(args, 1);
          const [flag] = args;
          this.osHandler.handleFlag(flag);
          break;
        }
        case "hash": {
          this._validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.hashHandler.calcHash(pathToFile);
          break;
        }
        case "compress":
        case "decomppress": {
          break;
        }
        case ".exit": {
          process.exit();
        }
        default: {
          console.log(ERR_INVALID_INPUT);
        }
      }
    } catch {
      throw new Error(ERR_OPERATION_FAILED);
    };
  }

  _validateNumberOfArgs(args, number) {
    if (args.length !== number) {
      throw new Error(ERR_OPERATION_FAILED);
    }
  }
}
