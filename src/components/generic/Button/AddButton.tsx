import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../libs/hooks/hooks';

import { openModal } from '../../../store/slices/modalSlice';
import { addItems } from '../../../store/slices/portfolioSlice';

import InputForm from '../../Modal/ModalInput';

import Button from './Button';

interface buttonProps {
  rank: string;
  price: number;
  text: string;
  id: string;
  name: string;
}

export default function AddButton({ rank, id, price, text, name }: buttonProps) {
  const [formActive, setFormActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onClickAdd = (value: string) => {
    if (+value > 0) {
      const item = {
        id: rank,
        title: id,
        price: price,
        amount: value,
        name: name,
      };
      dispatch(addItems(item));
      setFormActive(!formActive);
    } else {
      alert('Incorrect value');
    }
  };

  useEffect(() => {
    if (formActive) {
      dispatch(openModal(true));
    }
    return () => {
      dispatch(openModal(false));
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

  const onClickBtn = () => {
    setFormActive(!formActive);
  };

  return (
    <div>
      <Button
        text={text}
        backgroundColor={'olive'}
        color={'white'}
        size={'md'}
        onClickBtn={onClickBtn}
        dataAtt="addBtn"
      />
      {formActive && <InputForm onClickAdd={onClickAdd} setFormActive={setFormActive} />}
    </div>
  );
}
