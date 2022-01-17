interface IWhiteboard {
  children: string
}

const Whiteboard = (props:IWhiteboard) => {
  const { children } = props
  return `<div class="whiteboard">${children}</div>`
}

export default Whiteboard
