interface IWhiteboard extends IComponent {}

const Whiteboard = (props: IWhiteboard) => {
  const { children } = props;
  const subitems = Array.isArray(children)
    ? children.join('')
    : children || '';

  return `<div class="whiteboard">${subitems}</div>`;
};

export default Whiteboard;
