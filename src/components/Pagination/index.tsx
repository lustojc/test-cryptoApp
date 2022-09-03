interface props {
  paginate: (el: number) => void;
}

export default function Pagination({ paginate }: props) {
  const pageNumbers = [];

  for (let i = 1; i <= 10; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-block">
      <ul className="pagination-block__content">
        {pageNumbers.map((el: number) => (
          <li className="pagination-block__content-item" key={el}>
            <a className="pagination-block__content-link" onClick={() => paginate(el)}>
              {el}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
