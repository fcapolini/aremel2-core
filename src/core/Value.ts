import Scope from "./Scope";

export interface ValueProps {
	name?: string;
	value?: any;
	expr?: () => any;
	refs?: string[];
}

export default class Value {
	scope: Scope;
	props: ValueProps;

	constructor(scope: Scope, props: ValueProps) {
		this.scope = scope;
		this.props = props;
	}
}
