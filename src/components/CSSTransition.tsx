import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useRef } from 'react';

interface IProps {
  children: (props: { className: string; ref: React.ForwardedRef<HTMLDivElement> }) => JSX.Element;
}

// TODO

export const CSSTransition = (props: IProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const className = classNames('animation-enter');

  useEffect(() => {
    console.log('ref ', ref);
  }, [ref]);

  return props.children({ className, ref });
};

CSSTransition.displayName = 'CSSTransition';
