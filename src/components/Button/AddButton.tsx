export default function AddButton({ onClickAdd, rank, name, price, text }: any) {
  return (
    <div>
      <button className="crypto-block__btn" onClick={() => onClickAdd(rank, name, price)}>
        {text}
      </button>
    </div>
  );
}
