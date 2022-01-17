import { useRef } from '@app/view';
import ui from '@app/l18n/ui.json';

interface IMindMapItem extends IComponent {
  button: IButton;
  card: ICard;
  content: string;
  onAddChild?: (event: MouseEvent) => void;
  onAddSibling?: (event: MouseEvent) => void;
}

const MindMapItem = (props: IMindMapItem) => {
  const {
    children,
    content,
    button: Button,
    card: Card,
    onAddChild,
    onAddSibling,
  } = props;
  const subitems = Array.isArray(children)
    ? children.join('')
    : children || '';

  const card = Card({
    className: 'mindMapItem__content',
    children: [
      content,
      Button({
        children: ui.add,
        title: ui.add_node_title,
        className: 'mindMapItem__addNode',
        onClick: onAddChild,
      }),
      Button({
        children: ui.add,
        title: ui.add_subnode_title,
        className: 'mindMapItem__addSubNode',
        onClick: onAddSibling,
      }),
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
