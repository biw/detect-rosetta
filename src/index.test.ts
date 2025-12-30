import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import detectRosetta from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

describe("detectRosetta", () => {
  it("should be callable and return a result", () => {
    const result = detectRosetta();
    expect(result).toBeDefined();
  });

  it("should return a boolean", () => {
    const result = detectRosetta();
    expect(typeof result).toBe("boolean");
  });

  it("should return consistent results across multiple calls", () => {
    const result1 = detectRosetta();
    const result2 = detectRosetta();
    expect(result1).toBe(result2);
  });

  it("should return false on non-macOS platforms", () => {
    if (process.platform !== "darwin") {
      expect(detectRosetta()).toBe(false);
    }
  });
});

// Integration test for native ARM execution (works locally on Apple Silicon)
describe("detectRosetta integration", () => {
  const isAppleSilicon =
    process.platform === "darwin" && process.arch === "arm64";

  it.skipIf(!isAppleSilicon)(
    "should return false when running natively on ARM",
    () => {
      // Run a subprocess to verify the detection works
      const script = `
        import detectRosetta from '${projectRoot}/dist/index.js';
        console.log(detectRosetta());
      `;
      const result = execSync(
        `arch -arm64 node --input-type=module -e "${script}"`,
        { encoding: "utf-8" }
      );
      expect(result.trim()).toBe("false");
    }
  );

  // NOTE: The x86_64 Rosetta test requires an x86_64 Node.js installation
  // and is tested in CI via the rosetta-test job (see .github/workflows/ci.yml)
});
