interface props {
  text: string;
  backgroundColor: string;
  color: string;
  size: 'lg' | 'md' | 'sm';
  onClickBtn: () => void;
}

export default function Button({
  text = 'Button',
  backgroundColor = 'black',
  color = 'white',
  size = 'md',
  onClickBtn,
}: props) {
  let scale = 1;
  if (size === 'lg') scale = 2;
  if (size === 'md') scale = 1;
  if (size === 'sm') scale = 0.5;

  const style = {
    backgroundColor,
    padding: `${scale * 0.5}rem ${scale * 1}rem`,
    border: 'none',
    color,
  };
  return (
    <button onClick={onClickBtn} className="crypto-block__btn" style={style}>
      {text}
    </button>
  );
}
