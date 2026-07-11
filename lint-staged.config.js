/* eslint-disable */

export default {
  // Полная проверка типов (tsc не умеет работать по списку файлов).
  "*.{ts,tsx}": () => "pnpm run check-types",
  // Prettier только по застейдженным файлам.
  "*.{js,jsx,ts,tsx,json,md,css,scss}": (files) =>
    `prettier --write ${files.map((f) => `"${f}"`).join(" ")}`,
};
