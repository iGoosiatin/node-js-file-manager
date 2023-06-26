import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";

export default class ArchiveHandler {
  async archive(inputFilePath, outputFilePath, shouldDecompress = false) {
    const inputStream = createReadStream(inputFilePath);
    const outputStream = createWriteStream(outputFilePath, { flags: "wx" });
    const archiveStream = shouldDecompress ? createBrotliDecompress() : createBrotliCompress();

    await pipeline(inputStream, archiveStream, outputStream);
  };
}
