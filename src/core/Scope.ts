import Value, { ValueProps } from "./Value";

export interface ScopeProps {
	name?: string;
	values?: ValueProps[];
}

export default class Scope {
	root: Scope;
	parent?: Scope;
	props: ScopeProps;
	children: Scope[];
	values: Map<string, Value>;

	constructor(parent?: Scope, props?: ScopeProps, cb?: (that: Scope) => void) {
		this.root = parent ? parent.root : this;
		this.parent = parent;
		this.props = props ?? {};
		this.children = [];
		this.values = new Map();
		props?.values?.forEach((valueProps, index) => {
			// anonymous values get a '0'-prefixed name not to conflict w/ named ones
			const name = (valueProps.name ? valueProps.name : `0${index}`);
			this.values.set(name, new Value(this, valueProps));
		});
		if (parent) {
			parent.children.push(this);
		}
		cb ? cb(this) : null;
	}

	// ===========================================================================
	// private
	// ===========================================================================

	_lookupName(name: string): Scope | Value | undefined {
		let ret: Scope | Value | undefined = this.values.get(name);
		!ret && this.props.name === name ? ret = this : null;
		!ret && this.parent ? ret = this.parent._lookupName(name) : null;
		return ret;
	}

}
