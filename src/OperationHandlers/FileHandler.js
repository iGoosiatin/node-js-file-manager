import { rm, writeFile, rename } from "fs/promises";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";


export default class FileHandler {
  cat(pathToFile) {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(pathToFile);
      readStream.on("error", () => reject());
      readStream.on("data", (data) => console.log(data.toString()));
      readStream.on("end", () => resolve());
    });
  };

  async add(pathToFile) {
    await writeFile(pathToFile, "", { flag: "wx" });
  };

  async rn(pathToFile, newFileName) {
    await rename(pathToFile, newFileName);
  };

  async cp(pathToSourceFile, pathToTargetDirectory) {
    const pathToTargetFile = join(pathToTargetDirectory, pathToSourceFile);
    const readStream = createReadStream(pathToSourceFile);
    const writeStream = createWriteStream(pathToTargetFile, { flags: "wx" });
    await pipeline(readStream, writeStream);
  };

  async mv(pathToSourceFile, pathToTargetDirectory) {
    await this.cp(pathToSourceFile, pathToTargetDirectory);
    await this.rm(pathToFile);
  };

  async rm(pathToFile) {
    await rm(pathToFile);
  };
}
