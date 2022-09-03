import { useEvent } from '@/hooks';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CSSProperties, useRef } from 'react';
import './Dialog.less';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  centered?: boolean;
  width?: number;
  children: JSX.Element;
}

const enterClsToggle = (element: HTMLDivElement, name: 'add' | 'remove') => {
  (element.classList as any)[name as any]('animation');
  (element.classList as any)[name as any]('animation-enter');
};

const leaveClsToggle = (element: HTMLDivElement, name: 'add' | 'remove') => {
  (element.classList as any)[name as any]('animation');
  (element.classList as any)[name as any]('animation-leave');
};

type AnimationType = 'enter' | 'leave' | 'none';

const usePrevState = <T,>(state: T) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return [ref.current, state];
};

export const Dialog = ({ visible, children, centered, width, onClose }: DialogProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [type, setType] = useState<AnimationType>();
  const prevState = usePrevState(visible);

  const getActionType = useEvent(() => {
    return type;
  });

  useEffect(() => {
    if (prevState[0] === null && prevState[1] === false) {
      setType('none');
    } else if (prevState[0] === true && prevState[1] === false) {
      setType('leave');
    } else if (prevState[0] === false && prevState[1] === true) {
      setType('enter');
    }
  }, [prevState]);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const wrapElememt = wrapperRef.current as HTMLDivElement;

    element.addEventListener('animationend', () => {
      const currentType = getActionType() as AnimationType;

      if (currentType === 'enter') {
        enterClsToggle(element, 'remove');
      } else if (currentType === 'leave') {
        leaveClsToggle(element, 'remove');
        wrapElememt.style.display = 'none';
      }
    });
  }, []);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    if (visible) {
      leaveClsToggle(element, 'remove');
      enterClsToggle(element, 'add');
    }
  }, [visible]);

  const onWrapperClick = (e: React.SyntheticEvent) => {
    if (e.target === wrapperRef.current) {
      onClose();

      const element = contentRef.current as HTMLDivElement;
      leaveClsToggle(element, 'add');
    }
  };

  const createWrapStyle = (): CSSProperties => {
    if (type === 'none') {
      return { display: 'none' };
    } else if (type === 'enter') {
      return { display: 'block' };
    }

    return { display: 'unset' };
  };

  const wrapCls = classNames('Dialog-wrap', { 'Dialog-centered': centered });
  const wrapStyle: CSSProperties = createWrapStyle();

  const contentStyle: CSSProperties = {
    width,
  };

  return (
    <div className="Dialog-root">
      <div className={wrapCls} ref={wrapperRef} onClick={onWrapperClick} style={wrapStyle}>
        <div className={'Dialog'} ref={contentRef} style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};
