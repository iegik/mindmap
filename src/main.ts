declare const document: HTMLDocument;
import Whiteboard from '@app/whiteboard/whiteboard'
import Button from '@app/button/button'
import Card from '@app/card/card'
import MindMapItem from '@app/mind-map-item/mind-map-item'
import ui from '@app/l18n/ui.json'

document.title = ui.title
document.getElementById('root').innerHTML = Whiteboard({
  children: [
    MindMapItem({
      content: 'Test1',
      children: [
        MindMapItem({ content: 'Test3', children: [], button: Button, card: Card }),
        MindMapItem({
          content: 'Test4',
          children: [
            MindMapItem({ content: 'Test5', children: [], button: Button, card: Card }),
            MindMapItem({ content: 'Test6', children: [], button: Button, card: Card }),
          ],
          button: Button, card: Card
        }),
      ],
      button: Button, card: Card,
    }),
    MindMapItem({ content: 'Test2', children: [], button: Button, card: Card }),
  ]
});
