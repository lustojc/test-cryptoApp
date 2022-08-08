import { useState } from 'react';

import styles from './modal.module.scss';

interface InputFormProps {
  onClickAdd: (value: string) => void;
  setFormActive: (value: boolean) => void;
}

export default function InputForm({ onClickAdd, setFormActive }: InputFormProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const getInputValue = (value: string) => {
    setInputValue(value);
  };

  return (
    <>
      <div className={styles.modalBackup} onClick={() => setFormActive(false)}>
        <div className={styles.centered} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.headingInput}>
                How many coins do you want to add to your portfolio?
              </h5>
            </div>
            <button className={styles.closeBtn} onClick={() => setFormActive(false)}>
              X
            </button>
            <div className={styles.modalContent}>
              <div className={styles.inputContainer}>
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
