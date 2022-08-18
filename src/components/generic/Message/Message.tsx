interface props {
  color: string;
  message: string;
  fontSize: number;
  backgroundColor?: string;
  fontStyle?: 'italic' | 'bold' | 'normal' | 'oblique';
}

export default function Message({ color, message, fontSize, backgroundColor, fontStyle }: props) {
  const style = {
    color,
    fontSize: fontSize,
    display: 'inline',
    padding: '10px',
    backgroundColor,
    fontStyle,
  };

  return <div style={style}>{message}</div>;
}
