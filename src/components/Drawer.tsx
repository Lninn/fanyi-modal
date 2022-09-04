import React from 'react';
import { ReactNode } from 'react';
import { Motion } from './Motion';

import './Drawer.less';

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface PanelProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Panel = React.forwardRef<any, PanelProps>((props, ref) => {
  return (
    <div className="Drawer-root">
      <div className={`Drawer-wrap hide ${props.className}`} ref={ref}>
        <div className="Drawer-content">{props.children}</div>
      </div>
    </div>
  );
});

Panel.displayName = 'Panel';

export const Drawer = (props: DrawerProps) => {
  return (
    <Motion visible={props.visible}>
      {(transitionProps, transitionRef) => {
        return <Panel {...props} className={transitionProps.className} ref={transitionRef} />;
      }}
    </Motion>
  );
};
