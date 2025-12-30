# detect-rosetta

[![CI](https://badgen.net/github/checks/biw/detect-rosetta)](https://github.com/biw/detect-rosetta/actions)
[![npm version](https://badgen.net/npm/v/detect-rosetta)](https://www.npmjs.com/package/detect-rosetta)
[![npm downloads](https://badgen.net/npm/dt/detect-rosetta)](https://www.npmjs.com/package/detect-rosetta)

A Node.js package for detecting if a process is running under Rosetta translation on macOS.

## Installation

```sh
yarn add detect-rosetta
```

> [!NOTE]
> This package is ESM-only. Use `import`/`export` syntax or dynamic `import()` - `require('detect-rosetta')` is not supported.

## Usage

```typescript
import detectRosetta from "detect-rosetta";

const isRosetta = detectRosetta();
console.log(isRosetta); // true or false
```

## Return Values

- `true` - Process is running under Rosetta translation (x86_64 binary on Apple Silicon)
- `false` - Process is running natively, or on a non-macOS platform

## License

MIT
