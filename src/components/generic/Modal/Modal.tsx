import PortfolioItem from '../../PortfolioItem/PortfolioItem';

interface props {
  setModalActive: (state: boolean) => void;
}

export const Modal = ({ setModalActive }: props) => {
  return (
    <>
      <div className="modal-block" onClick={() => setModalActive(false)}>
        <div className="modal-block__wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="modal-block__content">
            <div className="modal-block__content-title">
              <h5>My Portfolio</h5>
            </div>
            <button className="modal-block__content-closeBtn" onClick={() => setModalActive(false)}>
              X
            </button>
            <div className="modal-block__content-items">
              <PortfolioItem />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
