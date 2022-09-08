import { ButtonHTMLAttributes } from 'react';

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  backgroundColor: string;
  color: string;
  size: 'lg' | 'md' | 'sm';
  dataAtt: string;
  borderRadius?: string;
  type?: 'submit' | 'reset' | 'button';
  onClickBtn?: () => void;
}

export default function Button({
  text = 'Button',
  backgroundColor = 'olive',
  color = 'white',
  size = 'md',
  dataAtt,
  onClickBtn,
  borderRadius,
  type,
}: props) {
  return (
    <button
      onClick={onClickBtn}
      data-cy={dataAtt}
      type={type}
      className={`button button-backgroundColor__${backgroundColor} button-size__${size} button-color__${color} button-borderRadius__${borderRadius} `}>
      {text}
    </button>
  );
}
