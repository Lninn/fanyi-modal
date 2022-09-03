import './Drawer.less';
import { CSSTransition } from './CSSTransition';

export const Drawer = () => {
  const foo = (props: { className: string; ref: React.ForwardedRef<HTMLDivElement> }) => (
    <div className="Drawer-root">
      <div className={`Drawer-wrap ${props.className}`} ref={props.ref}>
        <div className="Drawer-content">Drawer</div>
      </div>
    </div>
  );

  return <CSSTransition>{foo}</CSSTransition>;
};
