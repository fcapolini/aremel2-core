
export interface ScopeProps {
  name?: string,
  attributes?: { [key: string]: string },
}

export default class Scope {
  parent?: Scope;
  props: ScopeProps;

  constructor(parent?: Scope, props?: ScopeProps) {
    this.parent = parent;
    this.props = props ?? {};
  }
}
