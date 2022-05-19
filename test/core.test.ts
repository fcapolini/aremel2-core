import { assert } from "chai";
import Scope from '../src/core/Scope';

describe('core', function () {

	it("should create an empty Scope", () => {
		const scope = new Scope();
		assert.equal(scope.root, scope);
		assert.notExists(scope.parent);
		assert.exists(scope.props);
		assert.equal(scope.children.length, 0);
		assert.equal(scope.values.size, 0);
	});

});
