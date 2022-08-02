import PortfolioItem from '../PortfolioItem/PortfolioItem';

import styles from './modal.module.scss';

interface props {
  setModalActive: any;
}

export const Modal = ({ setModalActive }: props) => {
  return (
    <>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>My Portfolio</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setModalActive(false)}>
            X
          </button>
          <div className={styles.modalContent}>
            <PortfolioItem />
          </div>
        </div>
      </div>
    </>
  );
};
