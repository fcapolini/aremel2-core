import Scope from "./Scope";

export const ROOT_NAME = 'root';

export default class Context {
	root: Scope;

	constructor() {
		this.root = new Scope(this, undefined, ROOT_NAME);
	}
}
