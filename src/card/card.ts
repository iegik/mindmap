interface ICard extends IComponent {}

const Card = (props: ICard) => {
  const { children, className = '' } = props;
  const subitems = Array.isArray(children)
    ? children.join('')
    : children || '';

  return `<div class="${className} card">${subitems}</div>`;
};

export default Card;
