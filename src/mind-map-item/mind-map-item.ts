import { useRef } from '@app/view'
import ui from '@app/l18n/ui.json'

interface IMindMapItem extends IComponent {
  button: IButton,
  card: ICard,
  content: string,
}

const MindMapItem = (props:IMindMapItem) => {
  const { children, content, button: Button, card: Card } = props

  return `
    <div class="mindMapItem">
      ${Card({ children: [
    content,
    Button({ children: ui.add, title: ui.add_node_title }),
    Button({ children: ui.add, title: ui.add_subnode_title }),
  ]})}
      <div class="mindMapItem__subitems">
        ${children.length ? children.join('') : children}
      </div>
    </div>
  `
}

export default MindMapItem
