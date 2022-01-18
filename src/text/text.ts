interface IText extends IComponent {
  value?: string;
}

const Text = (props: IText) => {
  const { className, value } = props;

  p = document.createElement('p');
  p.classList.add(className);
  p.innerText = value;
  return p.innerHTML;
};

export default Text;
