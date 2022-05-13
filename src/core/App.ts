import Scope, { ScopeProps } from "./Scope";

export interface AppProps extends ScopeProps {
  win: Window;
}

export default class App extends Scope {
  win?: Window;
  doc?: Document;

  constructor(props: AppProps) {
    super(undefined, props);
  }

  get appProps() {
    return this.props as AppProps;
  }

  createElement(
    tagName: string,
    attributes?: { [key: string]: string },
    parent?: HTMLElement,
    before?: Node
  ) {
    const ret = this.doc?.createElement(tagName);
    for (const key in attributes) {
      ret?.setAttribute(key, attributes[key]);
    }
    if (ret && parent) {
      parent.insertBefore(ret, before ?? null);
    }
    return ret;
  }

  createText(text: string, parent: HTMLElement | null, ref?: Node) {
    const ret = this.doc?.createTextNode(text);
    parent && ret ? parent.insertBefore(ret, ref ?? null) : null;
    return ret;
  }

  createFragment(html: string) {
    let dom: HTMLElement | undefined;
    const div = this.createElement('div') as HTMLElement;
    div.innerHTML = html;
    dom = div.firstElementChild ? div.firstElementChild as HTMLElement : undefined;
    if (dom && dom.parentNode) {
      dom.parentNode.removeChild(dom);
    }
    return dom;
  }

  // ===========================================================================
  // private
  // ===========================================================================

  override _init() {
    this.win = this.appProps.win;
    this.doc = this.win.document;
    super._init();
  }
}
