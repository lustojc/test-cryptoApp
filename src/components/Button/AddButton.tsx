interface buttonProps {
  onClickAdd: (id: number, name: string, price: number) => void;
  rank: string;
  price: number;
  text: string;
  name: string;
}

export default function AddButton({ onClickAdd, rank, name, price, text }: buttonProps) {
  return (
    <div>
      <button className="crypto-block__btn" onClick={() => onClickAdd(+rank, name, price)}>
        {text}
      </button>
    </div>
  );
}
