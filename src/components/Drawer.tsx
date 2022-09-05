import React, { CSSProperties } from 'react';
import { ReactNode } from 'react';
import { Motion } from './Motion';

import './Drawer.less';
import classNames from 'classnames';

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
  const contentCls = classNames('Drawer-content', props.className);

  // 离开的时候这里不能先设置
  const wrapStl: CSSProperties = {
    display: props.visible ? 'block' : 'none',
  };

  return (
    <div className="Drawer-root">
      <div className="Drawer-wrap" style={wrapStl} ref={ref}>
        <div className={contentCls}>{props.children}</div>
      </div>
    </div>
  );
});

Panel.displayName = 'Panel';

export const Drawer = ({ visible, onClose, children }: DrawerProps) => {
  return (
    <Motion name="move" visible={visible}>
      {(transitionProps, transitionRef) => {
        return (
          <Panel
            visible={transitionProps.visible}
            onClose={onClose}
            className={transitionProps.className}
            ref={transitionRef}>
            {children}
          </Panel>
        );
      }}
    </Motion>
  );
};
