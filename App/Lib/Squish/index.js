export default function squish(string) {
  const lines = string.split(/(?:\r\n|\n|\r)/);
  return lines.map((line) => removeLeadSpaces(line)).join(' ').trim();
}

function removeLeadSpaces(line) {
  return line.replace(/^\s+/gm, '');
}
