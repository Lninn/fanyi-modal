import { getIconConfig, IconType } from '@/assets/getIconConfig';
import { TranslateContext } from '@/feature/Translate';
import classNames from 'classnames';
import { useContext } from 'react';

import './Action.less';

interface ActionProps {
  iconType: IconType;
  onClick?: () => void;
}

const Action = ({ iconType, onClick }: ActionProps) => {
  const { clsPrefix } = useContext(TranslateContext);
  const config = getIconConfig(iconType);

  if (!config) return null;

  const cls = classNames(`${clsPrefix}-action`, {
    [`${clsPrefix}-interactive`]: !!onClick,
  });

  return (
    <span className={cls} title={config.title} onClick={onClick}>
      {config.svgDom}
    </span>
  );
};

export default Action;
