import './Button.less';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className="Button" onClick={onClick}>
      {children}
    </button>
  );
};
