import { Action, AvailableAction } from '../../common/models/Actions'

export interface RendererAction<T, K extends AvailableAction> extends Action<T, K> {
  children?: JSX.Element
}
