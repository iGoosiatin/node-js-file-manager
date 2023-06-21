const KNOWN_AGRUMENTS = ["--username"];

export const parseArguments = (args) => {
  const parsedArguments = {};
  args.forEach((arg) => {
    const [argName, argValue] = arg.split("=");
    if (KNOWN_AGRUMENTS.indexOf(argName) >= 0) {
      parsedArguments[argName.slice(2)] = argValue;
    }
  });
  return parsedArguments;
};
