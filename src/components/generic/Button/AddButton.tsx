import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../libs/hooks/hooks';
import { addItems } from '../../../store/slices/portfolioSlice';
import InputForm from '../Modal/ModalInput';

interface buttonProps {
  rank: string;
  price: number;
  text: string;
  name: string;
}

export default function AddButton({ rank, name, price, text }: buttonProps) {
  const [formActive, setFormActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onClickAdd = (value: string) => {
    if (+value > 0) {
      const item = {
        id: rank,
        title: name,
        price: price,
        amount: value,
      };
      dispatch(addItems(item));
      setFormActive(!formActive);
    } else {
      alert('Incorrect value');
    }
  };

  useEffect(() => {
    if (formActive) {
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [formActive]);

  useEffect(() => {
    const closeModal = (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
        setFormActive(false);
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  return (
    <div>
      <button className="crypto-block__btn" onClick={() => setFormActive(!formActive)}>
        {text}
      </button>
      {formActive && <InputForm onClickAdd={onClickAdd} setFormActive={setFormActive} />}
    </div>
  );
}
