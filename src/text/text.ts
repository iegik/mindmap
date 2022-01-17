interface IText extends IComponent {
  data?: string;
}

const Text = (props: IText) => {
  const { className, data } = props;

  p = document.createElement('p')
  p.classList.add(className)
  p.innerText = data
  return p.innerHTML
};

export default Text;
