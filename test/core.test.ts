import { assert } from "chai";
import Context, { ROOT_NAME } from '../src/core/Context';

describe('core', function () {

	it("should create a Context", () => {
		const ctx = new Context();
		assert.exists(ctx.root);
		assert.equal(ctx.root.name, ROOT_NAME);
		const root = ctx.root.lookup(ROOT_NAME);
		assert.exists(root);
		assert.equal(root, ctx.root);
	});

});
