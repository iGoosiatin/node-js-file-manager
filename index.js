import FileManager from "./src/FileManager.js";
import { parseArguments } from "./src/argParser.js";

const parsedArguments = parseArguments(process.argv.slice(2));

const fileManager = new FileManager(parsedArguments.username);

fileManager.start();
