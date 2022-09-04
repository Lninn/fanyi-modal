import { ReactNode } from 'react';
import { CSSTransition } from './CSSTransition';

import './Drawer.less';

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Drawer = (props: DrawerProps) => {
  return (
    <CSSTransition visible={props.visible}>
      {(transitionProps, ref) => {
        return (
          <div className="Drawer-root">
            <div className={`Drawer-wrap ${transitionProps.className}`} ref={ref}>
              <div className="Drawer-content">{props.children}</div>
            </div>
          </div>
        );
      }}
    </CSSTransition>
  );
};
