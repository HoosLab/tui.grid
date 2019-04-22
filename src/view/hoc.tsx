import { h, AnyComponent, Component } from 'preact';
import { watch } from '../helper/reactive';
import { Store } from '../store/types';
import { DeepReadonly } from 'utility-types';
import { DispatchProps } from '../dispatch/create';

export function connect<SelectedProps = {}, OwnProps = {}>(
  selector?: (
    store: DeepReadonly<Store>,
    props: DeepReadonly<OwnProps>
  ) => DeepReadonly<SelectedProps>
) {
  type Props = OwnProps & SelectedProps & DispatchProps;

  return function(WrappedComponent: AnyComponent<Props>) {
    return class extends Component<OwnProps, SelectedProps> {
      public static displayName = `Connect:${WrappedComponent.name}`;

      public componentWillMount() {
        if (selector) {
          watch(() => {
            this.setState(selector(this.context.store, this.props as DeepReadonly<OwnProps>));
          });
        }
      }

      public render() {
        const { props, state } = this;
        const { dispatch } = this.context;

        return <WrappedComponent {...props} {...state} dispatch={dispatch} />;
      }
    };
  };
}
