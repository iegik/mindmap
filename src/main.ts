declare const document: HTMLDocument;
import Whiteboard from '@app/whiteboard/whiteboard';
import Button from '@app/button/button';
import Card from '@app/card/card';
import ITextInput from '@app/text-input/text-input';
import MindMapItem from '@app/mind-map-item/mind-map-item';
import NestedSet from '@app/nested-set';
import ui from '@app/l18n/ui.json';

const tree = new NestedSet();
// tree.setItem(1, 'Root');
// tree.setItem(2, 'Type');
// tree.setItem(3, 'Type2');
// tree.setItem(4, 'Group');
// tree.setItem(5, 'Group2');
// tree.setItem(6, 'SubGroup');

// const root_node_id = tree.addRoot(1);
// const type_node_id = tree.addNode(root_node_id, 2);
// const type_node2_id = tree.addNode(root_node_id, 3);
// const group_node_id = tree.addNode(type_node_id, 4);
// const group_node2_id = tree.addNode(type_node2_id, 5);
// const subgroup_node_id = tree.addNode(group_node_id, 6);
// const subgroup_node_id2 = tree.addNode(group_node2_id, 6);

const render = () => {
  document.getElementById('root').innerHTML = Whiteboard({
    children: [renderTree(tree.getRoot()?.itemId)],
  });

  // document.getElementById('root').innerHTML += `
  //   <pre id="test">${tree.debug()}</pre>
  // `;
}

const renderTree = (itemId: number = 1) => {
  if (!tree.getRoot()) {
    tree.setItem(itemId, '<new>');
    tree.addRoot(itemId);
  }
  const childs = tree.getChilds(itemId, 1);
  const value = tree.getItem(itemId);
  const parent = tree.getParent(itemId);

  return MindMapItem({
    value,
    children: childs.map((child: INode) => renderTree(child.itemId)),
    button: Button,
    card: Card,
    text: ITextInput,
    itemId,
    draggable: true,
    onAddChild: (e) => {
      const nextId = tree.getMaxId() + 1;

      tree.setItem(nextId, '<new>');
      tree.addNode(itemId, nextId);

      // FIXME: Rerender
      render();
    },
    onAddSibling: (e) => {
      const nextId = tree.getMaxId() + 1;

      tree.setItem(nextId, '<new>');
      tree.addNode(parent.itemId, nextId);

      // FIXME: Rerender
      render();
    },
    onRemoveChild: (e) => {
      tree.removeItem(itemId);

      // FIXME: Rerender
      render()
    },
    onMoveChild: (e) => {
      e.preventDefault();
      const src = JSON.parse(e.dataTransfer.getData("text/plain"))

      try {
        tree.moveNode(+src.itemId, itemId);
      } catch (e) {
        alert(e.message)
      }

      // FIXME: Rerender
      render()
    },
    onChange: (e) => {
      tree.setItem(itemId, e.target.value);
    },
    hasParent: parent !== false,
    allowNext: true,
  });
};

document.title = ui.title;
render()
