class Ref {
  toString() {
    return this.id = this.id || `ref-${+new Date()}`
  }
  get current() {
    return document.querySelector(`[ref=${this.id}]`)
  }
}

// export const createRef = () => new Ref;

export function useRef() {
  this.ref = this.ref || new Ref;
  return this.ref;
}
