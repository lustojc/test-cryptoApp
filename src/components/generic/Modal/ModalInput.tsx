import { useEffect, useState } from 'react';
import Message from '../Message/Message';

interface InputFormProps {
  onClickAdd: (value: string) => void;
  setFormActive: (value: boolean) => void;
}

export default function InputForm({ onClickAdd, setFormActive }: InputFormProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorColor, setErrorColor] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getInputValue = (value: string) => {
    const validatedValue = value.match(/[0-9]+[.]?[0-9]*/g)?.toString();
    if (validatedValue) {
      setInputValue(validatedValue);
    } else if (value === '') {
      setInputValue(value);
    }
  };

  useEffect(() => {
    if (inputValue === '') {
      setErrorMessage('');
      setErrorColor('black');
    } else if (+inputValue === 0) {
      setErrorColor('red');
      setErrorMessage('You entered an invalid value!');
    } else {
      setErrorMessage('The value is correct!');
      setErrorColor('green');
    }
  }, [inputValue, errorMessage]);

  return (
    <>
      <div className="modal-block" data-cy="modal-block" onClick={() => setFormActive(false)}>
        <div className="modal-block__wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="modal-block__content">
            <div className="modal-block__content-title">
              <h5 className="modal-block__content-title__main">
                How many coins do you want to add to your portfolio?
              </h5>
            </div>
            <button
              className="modal-block__content-closeBtn"
              data-cy="closeBtn"
              onClick={() => setFormActive(false)}>
              X
            </button>
            <div className="modal-block__content-items">
              <div className="modal-block__content-items__container">
                <input
                  style={{ borderColor: errorColor }}
                  type="text"
                  maxLength={8}
                  value={inputValue}
                  onChange={(e) => getInputValue(e.target.value)}
                  data-cy="input"
                />
                <button data-cy="addCoinsBtn" onClick={() => onClickAdd(inputValue)}>
                  Add
                </button>
              </div>
              {errorMessage && <Message color={errorColor} message={errorMessage} fontSize={14} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
