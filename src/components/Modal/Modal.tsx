import Button from '../generic/Button/Button';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

interface props {
  setModalActive: (state: boolean) => void;
}

export const Modal = ({ setModalActive }: props) => {
  return (
    <>
      <div className="modal-block" data-cy="modal-block" onClick={() => setModalActive(false)}>
        <div className="modal-block__wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="modal-block__content">
            <h5 className="modal-block__content-title">My Portfolio</h5>
            <div className="modal-block__content-closeBtn">
              <Button
                dataAtt="closeBtn"
                onClickBtn={() => setModalActive(false)}
                text={'X'}
                backgroundColor={'white'}
                color={'black'}
                size={'md'}
                borderRadius={'rounded'}
              />
            </div>
            <div className="modal-block__content-items">
              <PortfolioItem />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
