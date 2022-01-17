interface IWhiteboard extends IComponent {}

const Whiteboard = (props:IWhiteboard) => {
  const { children } = props
  return `<div class="whiteboard">${children.length ? children.join('') : children}</div>`
}

export default Whiteboard
