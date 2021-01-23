import { h, Component } from 'preact';
import { app } from './style.scss';
import Cavebot from '../Cavebot'

interface Props {}

interface State {
  isEditorOpen: boolean;
}

export default class App extends Component<Props, State> {
  state: State = {
    isEditorOpen: false,
  };


  constructor() {
    super();
    console.log('on App :tada:')
    // In development, persist application state across hot reloads:
    if (process.env.NODE_ENV === 'development') {
      this.setState(window.STATE);
      const oldCDU = this.componentDidUpdate;
      this.componentDidUpdate = (props, state, prev) => {
        if (oldCDU) oldCDU.call(this, props, state, prev);
        window.STATE = this.state;
      };
    }

    // Since iOS 10, Apple tries to prevent disabling pinch-zoom. This is great in theory, but
    // really breaks things on Squoosh, as you can easily end up zooming the UI when you mean to
    // zoom the image. Once you've done this, it's really difficult to undo. Anyway, this seems to
    // prevent it.
    document.body.addEventListener('gesturestart', (event) => {
      event.preventDefault();
    });

  }
  componentDidUpdate(prevProps: Props, prevState: State, prevContext: any) {
    const { isEditorOpen } = this.state;
    if (prevState.isEditorOpen !== isEditorOpen) {
      document.body.classList.toggle('editing', isEditorOpen);
      const { messageUI } = window.deskgap || {};
      messageUI.send('is-editing-changed', isEditorOpen);
    }
  }

  render({}: Props, { isEditorOpen }: State) {
    return (
      <div id="app" class={app} className="grid grid-flow grid-cols-12">
        <div className="col-span-2 col-start-8">
          <Cavebot />
        </div>
      </div>
    );
  }
}
