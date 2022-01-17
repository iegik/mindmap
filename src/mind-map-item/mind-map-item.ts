import { useRef } from '@app/view';
import ui from '@app/l18n/ui.json';

interface IMindMapItem extends IComponent {
  button: IButton;
  card: ICard;
  content: string;
  onAddChild?: (event: MouseEvent) => void;
  onAddSibling?: (event: MouseEvent) => void;
  hasParent: boolean;
  allowNext: boolean;
}

const MindMapItem = (props: IMindMapItem) => {
  const {
    children,
    content,
    button: Button,
    card: Card,
    text: Text,
    onAddChild,
    onAddSibling,
    hasParent,
    allowNext,
  } = props;
  const subitems = Array.isArray(children)
    ? children.join('')
    : children || '';

  const controls = []
  if (hasParent) controls.push(Button({
    children: ui.add,
    title: ui.add_subnode_title,
    className: 'mindMapItem__addSubNode',
    onClick: onAddSibling,
  }))

  if (allowNext) controls.push(Button({
    children: ui.add,
    title: ui.add_node_title,
    className: 'mindMapItem__addNode',
    onClick: onAddChild,
  }))

  const card = Card({
    className: 'mindMapItem__content',
    children: [
      Text({ data: content }),
      ...controls,
    ],
  });

  return `
    <div class="mindMapItem">
      ${card}
      <div class="mindMapItem__subitems">
        ${subitems}
        <div class="mindMapItem__dropArea">+</div>
      </div>
    </div>
  `;
};

export default MindMapItem;
