import {
  Application, Loader, Resource, Text, Texture, Ticker
} from 'pixi.js';
import { DebugUi } from './debug/debugUi';
import {
  Player
} from './app/player';
import { Vector2 } from './app/vector2';


// constants
const SIZE = 800;
const CENTER = SIZE / 2;

// create and append app
const app = new Application({
  width: SIZE,
  height: SIZE,
  backgroundColor: 0x1099bb, // light blue
  sharedTicker: true,
  sharedLoader: true,
});

document.body.appendChild(app.view);
const loader = Loader.shared;
const ticker = Ticker.shared;

// preload needed assets
loader.add('samir', '/assets/img/hero.png');

// when loader is ready
loader.load(() => {
  // create and append FPS text
  const fps = new Text('FPS: 0', { fill: 0xffffff });
  fps.scale.set(0.5, 0.5);
  app.stage.addChild(fps);

  // create and append hero
  const heroTexture = loader.resources.samir.texture as Texture<Resource>;
  const player = new Player(heroTexture, new Vector2(CENTER, CENTER));
  const debug = new DebugUi(player);
  app.stage.addChild(player.sprite);

  // animate hero each "tick": go left or right continuously
  ticker.add((delta: number) => {
    fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
    player.update(delta);
    debug.update();
  });
});
