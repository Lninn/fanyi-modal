import { useEffect, useRef } from 'react';

interface TargetInProps {
  clickInArea?: () => void;
}

export const useTargetIn = (props?: TargetInProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = ref.current;

    if (!target) return;

    const handleClick = (evt: MouseEvent) => {
      const clickTarget = evt.target as HTMLDivElement;
      const isIn = target.contains(clickTarget);

      if (isIn && props && props.clickInArea) {
        props.clickInArea();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return [ref] as const;
};
