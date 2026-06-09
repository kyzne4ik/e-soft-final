import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import { baseConfig } from "./base.js";

/**
 * Конфиг ESLint для пакетов и приложений, использующих React.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const reactInternalConfig = [
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
];

export default reactInternalConfig;
