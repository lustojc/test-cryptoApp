import { useState } from 'react';

// import styles from './modal.module.scss';

interface InputFormProps {
  onClickAdd: (value: string) => void;
  setFormActive: (value: boolean) => void;
}

export default function InputForm({ onClickAdd, setFormActive }: InputFormProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const getInputValue = (value: string) => {
    const validatedValue = value.match(/[0-9]+[.]?[0-9]*/g)?.toString();
    if (validatedValue) {
      setInputValue(validatedValue);
    } else if (value === '') {
      setInputValue(value);
    }
  };

  return (
    <>
      <div className="modal-block" onClick={() => setFormActive(false)}>
        <div className="modal-block__wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="modal-block__content">
            <div className="modal-block__content-title">
              <h5 className="modal-block__content-title__main">
                How many coins do you want to add to your portfolio?
              </h5>
            </div>
            <button className="modal-block__content-closeBtn" onClick={() => setFormActive(false)}>
              X
            </button>
            <div className="modal-block__content-items">
              <div className="modal-block__content-items__container">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => getInputValue(e.target.value)}
                />
                <button onClick={() => onClickAdd(inputValue)}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
