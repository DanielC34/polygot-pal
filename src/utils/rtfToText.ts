export function rtfToText(rtf: string): string {
  const rtfRegex = /\\([a-z]+)(-?\d+)? ?|[{}]|\\'([0-9a-fA-F]{2})|([^\\{}]+)/g;
  let match: RegExpExecArray | null;
  const output: string[] = [];
  const stack: number[] = [];

  while ((match = rtfRegex.exec(rtf)) !== null) {
    if (match[0] === "{") {
      // Push the current output length onto the stack
      stack.push(output.length);
    } else if (match[0] === "}") {
      // Remove the last group of text from the stack
      stack.pop();
    } else if (match[0][0] === "\\") {
      if (match[1] === "par" || match[1] === "line") {
        output.push("\n");
      } else if (match[1] === "tab") {
        output.push("\t");
      } else if (match[1] === "uc") {
        // Skip the specified number of Unicode characters
        rtfRegex.lastIndex += Number(match[2]);
      } else if (match[1] === "'") {
        // Convert hexadecimal character code to a string
        output.push(String.fromCharCode(parseInt(match[3], 16)));
      }
    } else if (match[4]) {
      // Add plain text to the output
      output.push(match[4]);
    }
  }

  return output.join("");
}
