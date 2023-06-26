import NavigationHandler from "./OperationHandlers/NavigationHandler.js";
import OSHandler from "./OperationHandlers/OSHandler.js";
import HashHandler from "./OperationHandlers/HashHandler.js";
import ArchiveHandler from "./OperationHandlers/ArchiveHandler.js";
import { ERR_INVALID_INPUT, ERR_OPERATION_FAILED } from "./errors.js";
import FileHandler from "./OperationHandlers/FileHandler.js";

export default class OperationsManager {
  constructor () {
    this.navigationHandler = new NavigationHandler();
    this.osHandler = new OSHandler();
    this.hashHandler = new HashHandler();
    this.archiveHandler = new ArchiveHandler();
    this.fileHandler = new FileHandler();
  };

  async handleOperation(input) {
    const indexOfSpace = input.indexOf(" ");
    const operation = indexOfSpace === -1 ? input : input.slice(0, indexOfSpace);
    const args = indexOfSpace === -1 ? [] : this._parseArgs(input.slice(indexOfSpace).trim());
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
        case "cat": {
          this._validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.fileHandler.cat(pathToFile);
          break;
        }
        case "add": {
          this._validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.fileHandler.add(pathToFile);
          break;
        }
        case "rn": {
          this._validateNumberOfArgs(args, 2);
          const [pathToFile, newFileName] = args;
          await this.fileHandler.rn(pathToFile, newFileName);
          break;
        }
        case "cp": {
          this._validateNumberOfArgs(args, 2);
          const [pathToFile, pathToDirectory] = args;
          await this.fileHandler.cp(pathToFile, pathToDirectory);
          break;
        }
        case "mv": {
          this._validateNumberOfArgs(args, 2);
          const [pathToFile, pathToDirectory] = args;
          await this.fileHandler.mv(pathToFile, pathToDirectory);
          break;
        }
        case "rm": {
          this._validateNumberOfArgs(args, 1);
          const [pathToFile] = args;
          await this.fileHandler.rm(pathToFile);
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
        case "decompress": {
          this._validateNumberOfArgs(args, 2);
          const [pathToInputFile, pathToOutputFile] = args;
          await this.archiveHandler.archive(pathToInputFile, pathToOutputFile, operation === "decompress");
          break;
        }
        case ".exit": {
          process.exit();
        }
        case ".cls": {
          console.clear();
          break;
        }
        default: {
          throw new Error(ERR_INVALID_INPUT);
        }
      }
    } catch (error){
      if (error?.message === ERR_INVALID_INPUT){
        throw new Error(ERR_INVALID_INPUT);
      };

      throw new Error(ERR_OPERATION_FAILED);
    };
  }

  _parseArgs(stringifiedArgs) {
    if (stringifiedArgs.includes("\\ ")) {
      const parsedArgs = [];
      while (stringifiedArgs) {
        const indexOfSpace = stringifiedArgs.search(/(?<!\\) /);
        if (indexOfSpace === -1) {
          // Single/last argument
          parsedArgs.push(stringifiedArgs.replaceAll("\\ ", " "));
          stringifiedArgs = "";
        } else {
          const arg = stringifiedArgs.slice(0, indexOfSpace);
          parsedArgs.push(arg.replaceAll("\\ ", " "));
          stringifiedArgs = stringifiedArgs.slice(indexOfSpace).trim();
        }
      };
      return parsedArgs;
    } else {
      return stringifiedArgs.split(" ").filter(Boolean);
    }
  }

  _validateNumberOfArgs(args, number) {
    if (args.length !== number) {
      throw new Error(ERR_INVALID_INPUT);
    }
  }
}
