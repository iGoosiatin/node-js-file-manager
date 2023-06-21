import { createHash }  from "crypto";
import { readFile } from "fs/promises";
import { basename } from "path";

export default class HashHandler {
  async calcHash(pathToFile) {
    const content = await readFile(pathToFile);
    const hash = this._calcHash(content);
    console.log(`${hash} ${basename(pathToFile)}`);
  };

  _calcHash(content) {
    const hash = createHash("sha256").update(content).digest("hex");
    return hash;
  };
}
