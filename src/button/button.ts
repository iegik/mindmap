import { createRef } from '@app/view'

interface IButton extends IComponent {
  onClick?: (event: MouseEvent) => void
}

const Button = (props:IButton) => {
  const { children, className, title, onClick } = props
  const ref = createRef()
  setTimeout(() => {
    if (onClick) {
      ref.current.addEventListener('click', onClick);
    }
  })

  return `<button class="${className} btn" ref="${ref}" title="${title}">${children}</button>`
}

export default Button
