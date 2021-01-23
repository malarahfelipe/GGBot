import { mouseClick, moveMouse } from "robotjs";
import { PlayerScreen } from "./PlayerScreen";

export interface Action {
  title: string,
  action: () => void
}
export const ACTIONS = Object.freeze<Array<Action>>([
  {
    title: 'Escada',
    action: () => {
      const { x, y } = PlayerScreen.getInstance().getPosition()
      moveMouse(x, y)
      mouseClick()
    }
  }
])
