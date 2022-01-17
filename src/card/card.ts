import { useRef } from '@app/view'

interface ICard extends IComponent {}

const Card = (props:ICard) => {
  const { children } = props

  return `<div class="card">${children.length ? children.join('') : children}</div>`
}

export default Card
