export default class FileManager {
  constructor(username) {
    this.username = username || "Anonymous";
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.username}!`);

    process.on('exit', () => {
      console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    })
  }
}