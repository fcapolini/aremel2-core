import Scope from "./Scope";

export default class Value {
	scope: Scope;

	constructor(scope: Scope) {
		this.scope = scope;
	}
}
