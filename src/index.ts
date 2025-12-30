import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface NativeAddon {
  isRosetta(): boolean;
}

/**
 * Detects if the current process is running under Rosetta translation on macOS.
 * @returns true if running under Rosetta, false otherwise (including non-macOS platforms)
 */
export default function detectRosetta(): boolean {
  // Only macOS can run under Rosetta
  if (process.platform !== "darwin") {
    return false;
  }

  const require = createRequire(import.meta.url);
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Load the native addon using node-gyp-build
  const addon: NativeAddon = require("node-gyp-build")(
    path.join(__dirname, "..")
  );

  return addon.isRosetta();
}
