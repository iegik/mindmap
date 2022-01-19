import { createRef } from '@app/view';
import ui from '@app/l18n/ui.json';

interface IMindMapItem extends IComponent {
  button: IButton;
  card: ICard;
  content: string;
  onAddChild?: (event: MouseEvent) => void;
  onAddSibling?: (event: MouseEvent) => void;
  onRemoveChild?: (event: MouseEvent) => void;
  onMoveChild?: (event: MouseEvent) => void;
  onChange?: (event: KeyboardEvent) => void;
  hasParent: boolean;
  allowNext: boolean;
  itemId: number;
  draggable?: boolean;
}

const MindMapItem = (props: IMindMapItem) => {
  const {
    children,
    value,
    button: Button,
    card: Card,
    text: Text,
    onAddChild,
    onAddSibling,
    onRemoveChild,
    onMoveChild,
    onChange,
    hasParent,
    allowNext,
    itemId,
    draggable = false,
  } = props;
  const ref = createRef();
  const subitems = Array.isArray(children)
    ? children.join('')
    : children || '';

  setTimeout(() => {
    if (draggable && onMoveChild) {
      ref.current.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData(
          'text/plain',
          JSON.stringify({ itemId }),
        );
      });
      ref.current.addEventListener('drop', onMoveChild);
    }
  });

  const controls = [];
  if (hasParent)
    controls.push(
      Button({
        children: ui.add_subnode,
        title: ui.add_subnode_title,
        className: 'mindMapItem__addSubNode',
        onClick: onAddSibling,
      }),
    );

  if (allowNext)
    controls.push(
      Button({
        children: ui.add_node,
        title: ui.add_node_title,
        className: 'mindMapItem__addNode',
        onClick: onAddChild,
      }),
    );

  if (allowNext)
    controls.push(
      Button({
        children: ui.remove_node,
        title: ui.remove_node_title,
        className: 'mindMapItem__removeNode',
        onClick: onRemoveChild,
      }),
    );

  const card = Card({
    children: [
      Text({
        value,
        onChange,
        multiline: true,
        className: 'mindMapItem__input',
      }),
      ...controls,
    ],
  });

  return `
    <div class="mindMapItem">
      <div class="mindMapItem__value" ref="${ref}"  draggable="${draggable}">
        ${card}
      </div>
      <div class="mindMapItem__dropArea"></div>
      <div class="mindMapItem__subitems">
        ${subitems}
      </div>
    </div>
  `;
};

export default MindMapItem;
