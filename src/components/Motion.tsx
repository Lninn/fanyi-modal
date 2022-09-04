import { useEvent } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

interface MotionProps {
  visible: boolean;
  children?: (
    props: {
      visible?: boolean;
      className?: string;
      style?: React.CSSProperties;
    },
    ref: (node: any) => void
  ) => React.ReactElement;
}

type Status = 'enter' | 'leave' | 'none';

const transitionCls = (status: Status) => {
  if (status === 'enter') {
    return 'animation-enter';
  } else if (status === 'leave') {
    return 'animation-leave';
  }
};

export const Motion = (props: MotionProps) => {
  const { visible, children } = props;

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>('none');

  const getStatus = useEvent(() => {
    return status;
  });

  const getElement = () => {
    return nodeRef.current;
  };

  useEffect(() => {
    if (visible) {
      setStatus('enter');
    } else {
      setStatus('leave');
    }
  }, [visible]);

  useEffect(() => {
    const element = getElement();
    if (!element) return;

    const handleAnimationEnd = () => {
      const crtStatus = getStatus() as Status;

      if (crtStatus === 'enter') {
        element.classList.remove('animation-enter');
        element.classList.remove('hide');
      } else if (crtStatus === 'leave') {
        element.classList.remove('animation-leave');
        element.classList.add('hide');
      }
    };

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  const setNodeRef = React.useCallback((node: any) => {
    nodeRef.current = node;
  }, []);

  if (!children) return null;

  const transitionChildren = children(
    {
      className: transitionCls(status),
      visible,
    },
    setNodeRef
  );

  return transitionChildren;
};

Motion.displayName = 'Motion';
