import classNames from 'classnames';
import React, { useCallback, useEffect, useState, useRef } from 'react';

type MotionName = 'zoom' | 'move';

interface MotionProps {
  name?: MotionName;
  visible: boolean;
  children?: (
    props: {
      visible: boolean;
      className: string;
      style?: React.CSSProperties;
    },
    ref: (node: any) => void
  ) => React.ReactElement;
}

type Status = 'enter' | 'leave' | 'none';

const transitionCls = (name: MotionName, status: Status) => {
  if (status === 'enter') {
    return classNames('animation animation-enter', name);
  } else if (status === 'leave') {
    return classNames('animation animation-leave', name);
  } else {
    return '';
  }
};

export const Motion = (props: MotionProps) => {
  const { visible, name = 'zoom', children } = props;

  const [syncVisible, setSyncVisible] = useState(visible);

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>('none');

  const handleAnimationEnd = useCallback(() => {
    setStatus('none');

    if (!visible) {
      setSyncVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setSyncVisible(visible);
      setStatus('enter');
    } else {
      setStatus('leave');
    }
  }, [visible]);

  const getElement = () => {
    return nodeRef.current;
  };

  useEffect(() => {
    const element = getElement();
    if (!element) return;

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [handleAnimationEnd]);

  const setNodeRef = React.useCallback((node: any) => {
    nodeRef.current = node;
  }, []);

  const className = transitionCls(name as MotionName, status);

  if (!children) return null;

  const transitionChildren = children(
    {
      className,
      visible: syncVisible,
    },
    setNodeRef
  );

  return transitionChildren;
};

Motion.displayName = 'Motion';
