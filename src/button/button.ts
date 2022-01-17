import { useRef } from '@app/view'

interface IButton extends IComponent {
  onClick?: (event: MouseEvent) => void
}

const Button = (props:IButton) => {
  const { children, onClick } = props
  const ref = useRef()
  setTimeout(() => {
    if (onClick) {
      ref.current.addEventListener('click', onClick);
    }
  })

  return `<button class="btn" ref="${ref}">${children}</div>`
}

export default Button
