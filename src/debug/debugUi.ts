import * as dat from 'dat.gui';
import { Player } from '../app/player';

export class DebugUi {

  constructor(p: Player) {
    const gui = new dat.GUI();
    const playerFolder: dat.GUI = gui.addFolder('Player');
    playerFolder.add(p.pos, "x").listen();
    playerFolder.add(p.pos, "y").listen();
  }

  public update() {
  }
}