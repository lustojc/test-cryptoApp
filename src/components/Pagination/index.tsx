interface props {
  paginate: (el: number) => void;
  currentPage: number;
}

export default function Pagination({ paginate, currentPage }: props) {
  const pageNumbers = [];

  for (let i = 1; i <= 10; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-block">
      <ul className="pagination-block__content">
        {pageNumbers.map((el: number) => (
          <li className="pagination-block__content-item" key={el}>
            <a
              href="#"
              className={`pagination-block__content-link ${
                currentPage === el && 'active-pagination'
              }`}
              onClick={() => paginate(el)}>
              {el}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
