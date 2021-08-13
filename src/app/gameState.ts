export class GameState {
  public timeScale: number = 1;
  static instance: GameState = new GameState();
}

export const state = GameState.instance;