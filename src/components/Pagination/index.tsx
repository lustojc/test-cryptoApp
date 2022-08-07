import styles from '../Pagination/Pagination.module.scss';

interface props {
  coinsPerPage: number;
  totalCoins: number;
  paginate: (el: number) => void;
}

export default function Pagination({ coinsPerPage, totalCoins, paginate }: props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.root}>
      <ul className={styles.pagination_wrapper}>
        {pageNumbers.map((el: number) => (
          <li className="page-item" key={el}>
            <a className="page-link" onClick={() => paginate(el)}>
              {el}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
