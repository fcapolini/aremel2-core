import App from "./App";
import Value from "./Value";

export const AKA_ATTR = ':aka';
export const ROOT_SLOT = 'root';
export const DEFAULT_SLOT = 'default';

export interface ScopeProps {
  name?: string,
  dom?: HTMLElement,
  html?: string,
}

export default class Scope {
  app: App;
  parent?: Scope;
  props: ScopeProps;
  dom?: HTMLElement;
  values: { [key: string]: Value };
  slots: { [key: string]: HTMLElement };
  texts: { [key: string]: Node };
  children: Scope[];

  constructor(parent?: Scope, props?: ScopeProps) {
    this.app = parent ? parent.app : this as any as App;
    this.parent = parent;
    this.props = props ?? {};
    this.values = {};
    this.slots = {};
    this.texts = {};
    this.children = [];
    this._init();
    this._link();
  }

  // ===========================================================================
  // private
  // ===========================================================================

  _init() {
    if (!(this.dom = this.props.dom)) {
      this.dom = this.app.createFragment(this.props.html ?? '<div></div>');
    }
    this.dom && this._collectSlots(this.dom);
    this.dom && this._collectTexts(this.dom);
    this.dom && this._collectValues(this.dom);
  }

  _collectSlots(e: HTMLElement) {
    const that = this;
    function scan(e: HTMLElement) {
      const aka = e?.getAttribute(AKA_ATTR)?.trim();
      if (aka && aka !== '') {
        that.slots[aka] = e as HTMLElement;
      }
      for (let i = 0; i < e.children.length; i++) {
        scan(e.children.item(i) as HTMLElement);
      }
    }
    scan(e);
    this.slots[ROOT_SLOT] = e;
    if (!this.slots[DEFAULT_SLOT]) {
      this.slots[DEFAULT_SLOT] = e;
    }
  }

  _collectTexts(e: HTMLElement) {
    const that = this;
    function scan(e: HTMLElement) {
      for (let i = 0; i < e.childNodes.length; i++) {
        const node = e.childNodes.item(i);
        if (node.nodeType === Node.COMMENT_NODE) {
          //TODO
          console.log(`found comment: "${node.nodeValue}"`);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          scan(node as HTMLElement);
        }
      }
    }
    scan(e);
  }

  _collectValues(e: HTMLElement) {
    const that = this;
    function scan(e: HTMLElement) {
      //TODO
      for (let i = 0; i < e.children.length; i++) {
        scan(e.children.item(i) as HTMLElement);
      }
    }
    scan(e);
    this.slots[ROOT_SLOT] = e;
    if (!this.slots[DEFAULT_SLOT]) {
      this.slots[DEFAULT_SLOT] = e;
    }
  }

  _link() {

  }

  _unlink() {

  }
}
