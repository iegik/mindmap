declare const document: HTMLDocument;
import Whiteboard from '@app/whiteboard/whiteboard'
import Button from '@app/button/button'
import ui from '@app/l18n/ui.json'

document.title = ui.title
document.getElementById('root').innerHTML = Whiteboard({
  children: Button({
    children: ui.greetings,
    onClick: () => { console.log('Hi!'); }
  })
});
