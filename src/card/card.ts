import { useRef } from '@app/view'

interface ICard extends IComponent {}

const Card = (props:ICard) => {
  const { children } = props

  return `<div class="card">${children}</div>`
}

export default Card
