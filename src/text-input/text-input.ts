import { createRef } from '@app/view';

interface ITextInput extends IComponent {
  value?: string
  onChange?: (event: KeyboardEvent) => void;
}

const TextInput = (props: ITextInput) => {
  const { value, className, onChange } = props;
  const ref = createRef();

  setTimeout(() => {
    if (onChange) {
      // ref.current.addEventListener('input', onChange);
      ref.current.addEventListener('blur', onChange);
    }
  });
  return `<input class="${className} input" value="${value}" ref="${ref}" />`;
};

export default TextInput;
