import React, { CSSProperties, forwardRef, useRef } from 'react';
import classNames from 'classnames';
import { Motion } from './Motion';

import './Dialog.less';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  centered?: boolean;
  width?: number;
  children: JSX.Element;
}

const Dialog = forwardRef<any, DialogProps & { motionClassName: string }>((props, ref) => {
  const { visible, motionClassName, children, centered, width, onClose } = props;

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const onWrapperClick = (e: React.SyntheticEvent) => {
    if (e.target === wrapperRef.current) {
      onClose();
    }
  };

  const wrapCls = classNames('Dialog-wrap', { 'Dialog-centered': centered });

  const motionCls = classNames('Dialog', motionClassName);

  const contentStyle: CSSProperties = {
    width,
  };

  const wrapStyle: CSSProperties = {
    display: visible ? 'block' : 'none',
  };

  return (
    <div className="Dialog-root">
      <div className={wrapCls} ref={wrapperRef} onClick={onWrapperClick} style={wrapStyle}>
        <div className={motionCls} ref={ref} style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  );
});

Dialog.displayName = 'Dialog';

const DialogWrap = (props: DialogProps) => {
  const { visible, ...restProps } = props;

  return (
    <Motion visible={props.visible}>
      {(motionProps, ref) => {
        return (
          <Dialog
            {...restProps}
            visible={motionProps.visible}
            motionClassName={motionProps.className}
            ref={ref}
          />
        );
      }}
    </Motion>
  );
};

export { DialogWrap as Dialog };
