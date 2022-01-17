declare const document: HTMLDocument;
import Whiteboard from '@app/whiteboard/whiteboard'
import Button from '@app/button/button'
import Card from '@app/card/card'
import MindMapItem from '@app/mind-map-item/mind-map-item'
import NestedSet from '@app/nested-set'
import ui from '@app/l18n/ui.json'


const tree = new NestedSet();
tree.setItem(1, 'Root')
tree.setItem(2, 'Type')
tree.setItem(3, 'Type2')
tree.setItem(4, 'Group')
tree.setItem(5, 'Group2')
tree.setItem(6, 'SubGroup')

const root_node_id = tree.addRoot(1)
const type_node_id = tree.addNode(root_node_id, 2)
const type_node2_id = tree.addNode(root_node_id, 3)
const group_node_id = tree.addNode(type_node_id, 4)
const group_node2_id = tree.addNode(type_node2_id, 5)
const subgroup_node_id = tree.addNode(group_node_id, 6)
const subgroup_node_id2 = tree.addNode(group_node2_id, 6)

document.title = ui.title
document.getElementById('root').innerHTML = `${Whiteboard({
  children: [
    MindMapItem({
      content: 'Test1',
      children: [
        MindMapItem({ content: 'Test3', button: Button, card: Card }),
        MindMapItem({
          content: 'Test4',
          children: [
            MindMapItem({ content: 'Test5', button: Button, card: Card }),
            MindMapItem({ content: 'Test6', button: Button, card: Card }),
          ],
          button: Button, card: Card,
        }),
      ],
      button: Button, card: Card,
    }),
    MindMapItem({ content: 'Test2', button: Button, card: Card }),
  ],
})  }<pre id="test">${tree.debug()}</pre>`;

