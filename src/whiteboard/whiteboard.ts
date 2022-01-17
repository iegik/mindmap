interface IWhiteboard {
  children: string
}

const Whiteboard = (props:IWhiteboard) => {
  const { children } = props
  return `<p class="whiteboard">${children}</p>`
}

export default Whiteboard
