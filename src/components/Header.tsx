import { useState } from 'react';
import { Modal } from './UI/Modal';

export default function Header() {
  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <div className="header">
      <div className="container">
        <div className="header__info">
          <div>
            <h1>Cryptocurrency App</h1>
          </div>
        </div>
        <div className="header__portfolio" onClick={() => setModalActive(true)}>
          <div>My Portfolio</div>
          <div>134,32 USD +2,38 (1,80 %).</div>
        </div>
        {modalActive && <Modal setModalActive={setModalActive} />}
      </div>
    </div>
  );
}
