class Ref {
  toString() {
    const id = Math.round(Math.random() * 1000000).toString(36);
    return (this.id = this.id || `ref-${id}`);
  }
  get current() {
    return document.querySelector(`[ref=${this.id}]`);
  }
}

export const createRef = () => new Ref();

export function useRef() {
  this.ref = this.ref || new Ref();
  return this.ref;
}
