declare const document: HTMLDocument;
import Whiteboard from './whiteboard/whiteboard'

document.getElementById('root').innerHTML = Whiteboard({ children: 'Hello, World!' });
