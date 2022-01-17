import { useRef } from '@app/view'

interface ICard extends IComponent {}

const Card = (props:ICard) => {
  const { children, className } = props

  return `<div class="${className} card">${children.length ? children.join('') : children}</div>`
}

export default Card
