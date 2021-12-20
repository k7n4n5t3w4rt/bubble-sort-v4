// @flow
import { install } from "esinstall";

install(
  [
    "htm",
    "htm/preact",
    "immer",
    "preact",
    "preact/hooks",
    "preact-render-to-string",
    "preact-router",
    "should/as-function.js",
    "simplestyle-js",
  ],
  {
    polyfillNode: false,
    /*options*/
    // cwd: string;
    // alias: Record<string, string>;
    // lockfile?: ImportMap;
    // logger: AbstractLogger;
    // verbose?: boolean;
    // dest: string;
    // env: EnvVarReplacements;
    // treeshake?: boolean;
    // polyfillNode: boolean;
    // sourceMap?: boolean | 'inline';
    // externalPackage: string[];
    // externalPackageEsm: string[];
    // packageLookupFields: string[];
    // packageExportLookupFields: string[];
    // namedExports: string[];
    // rollup: {
    //   context?: string;
    //   plugins?: RollupPlugin[];
    //   dedupe?: string[];
  },
);
// Result: Creates `preact.js` and `preact/hooks.js` inside a `web_modules/` directory in your current directory.
