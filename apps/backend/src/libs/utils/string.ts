export class StringToolKit {
  static compose(lines: (string | null)[]): string {
    return lines.filter((l): l is string => l !== null).join("\n");
  }
}
