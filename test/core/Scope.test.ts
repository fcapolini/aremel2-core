import App from "../../src/core/App";
import { assert } from "chai";
import { JSDOM } from "jsdom";

describe('Scope', function () {

	it("should create root Scope", () => {
		const dom = new JSDOM(`<!DOCTYPE html><head></head><body></body></html>`);
		const app = new App({ win: dom.window as any as Window });
		assert.exists(app.win);
		assert.exists(app.doc);
	});

});
