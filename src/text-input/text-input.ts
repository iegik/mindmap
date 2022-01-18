import { createRef } from '@app/view';

interface ITextInput extends IComponent {
  value?: string;
  onChange?: (event: KeyboardEvent) => void;
  multiline?: boolean;
}

const TextInput = (props: ITextInput) => {
  const { value, className = '', onChange, multiline } = props;
  const ref = createRef();

  setTimeout(() => {
    if (onChange) {
      // ref.current.addEventListener('input', onChange);
      ref.current.addEventListener('blur', onChange);
    }
  });

  if (multiline) {
    return `<textarea class="${className} text-input text-input--multiline" ref="${ref}">${value}</textarea>`;
  }

  return `<input class="${className} text-input" value="${value}" ref="${ref}" />`;
};

export default TextInput;
