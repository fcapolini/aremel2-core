import Context from "./Context";
import Value from "./Value";

export default class Scope {
	context: Context;
	parent?: Scope;
	name?: string;
	children: Scope[];
	values: Map<string, Value>;

	constructor(context: Context, parent?: Scope, name?: string) {
		this.context = context;
		this.parent = parent;
		this.name = name;
		this.children = [];
		this.values = new Map();
	}

	lookup(name: string): Scope | Value | undefined {
		const value = this.values.get(name);
		if (value) {
			return value;
		}
		if (this.name === name) {
			return this;
		}
		if (this.parent) {
			return this.parent.lookup(name);
		}
		return undefined;
	}
}
