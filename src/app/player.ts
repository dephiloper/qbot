import {
  Sprite, Texture, Resource
} from 'pixi.js';
import { Vector2 } from './point';
import { state } from './gameState';

const GRAVITY: number = 0.1;
const MAX_SPEED: number = 2;

export class Player {
  pos: Vector2;
  vel: Vector2 = new Vector2();
  sprite: Sprite;
  target: Vector2 = new Vector2();
  hasTarget: boolean = false;

  constructor(texture: Texture<Resource>, pos: Vector2 = new Vector2()) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.position.x = pos.x;
    this.sprite.position.y = pos.y;
    this.pos = pos;

    document.addEventListener('keydown', (ev: KeyboardEvent) => this.keyboard(ev, 'down'));
    document.addEventListener('keyup', (ev: KeyboardEvent) => this.keyboard(ev, 'up'));
    document.addEventListener('mousedown', (ev: MouseEvent) => this.mouse(ev, 'down'));
    document.addEventListener('mousemove', (ev: MouseEvent) => this.mouse(ev, 'move'));
    document.addEventListener('mouseup', (ev: MouseEvent) => this.mouse(ev, 'up'));
  }

  private keyboard(_ev: KeyboardEvent, _type: string) { }

  private mouse(ev: MouseEvent, type: string) {
    this.target = new Vector2(ev.x, ev.y);
    switch (type) {
      case 'down':
        this.hasTarget = true;
        state.timeScale = 0.8;
        break;
      case 'up':
        state.timeScale = 1.0;
        let dir: Vector2 = Vector2.subtract(this.target, this.pos).normalized;
        dir = Vector2.multiply(dir, 10);
        this.vel = Vector2.add(this.vel, dir);
        this.hasTarget = false;
        break;
      case 'move':
        break;
    }
  }

  public update(delta: number) {
    this.vel = Vector2.multiply(this.vel, 0.95);
    this.vel.y = this.vel.y + GRAVITY;
    if (this.vel.y < 0 && this.vel.y > MAX_SPEED) {
      this.vel = Vector2.multiply(this.vel.normalized, MAX_SPEED);
    }
    this.vel = Vector2.multiply(this.vel, state.timeScale);

    this.pos.x += this.vel.x * delta;
    this.pos.y += this.vel.y * delta;

    this.sprite.x = this.pos.x;
    this.sprite.y = this.pos.y;
  }
};