# Project setup

```bash
npm init -y
npm i -D typescript
tsc --init
mkdir build
mkdir src
mkdir test
```

tsconfig.json:
```json
	"compilerOptions": {
		...
		"target": "es5",
		"module": "commonjs",
		"rootDir": "./src",
		"outDir": "./build",
		...
```

.gitignore:
```
node_modules
build
```

src/index.ts:
```typescript
console.log('index.ts');
```

## Testing

```bash
npm i -D mocha chai ts-node
npm i -D @types/mocha @types/chai
```

package.json:
```json
	...
	"scripts": {
		"test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\"}' mocha -r ts-node/register 'test/**/*.test.ts'",
		"test-win": "set TS_NODE_COMPILER_OPTIONS={\"module\": \"commonjs\" } && mocha -r ts-node/register 'test/**/*.test.ts'"
	}
	...
```

tsconfig.json:
```json
{
	"include": ["src/**/*"], // don't include ./test/ dir
	...
```

test/dummy.test.ts:
```typescript
import { assert } from "chai";

describe('dummy', function () {

	it("should succeed", () => {
		assert.isTrue(true);
	});

});
```

### Testing Speedup

```bash
npm i -D @swc/core
```

tsconfig.json:
```json
{
	...
	"ts-node": {
		"transpileOnly": true,
		"transpiler": "ts-node/transpilers/swc-experimental"
	},
	...
```

### Testing Utils

[Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter)

```json
"mochaExplorer.files": "test/**/*.ts",
"mochaExplorer.require": "ts-node/register"
```

## JavaScript processing

```bash
npm i escodegen esprima estraverse
npm i -D @types/escodegen @types/esprima @types/estraverse
```

[JavaScript Proxy Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
