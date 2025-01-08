export default function LoadMoreBtn({ onClick }) {
    return (
      <button type="button" onClick={onClick} className="load-more">
        Load more
      </button>
    );
  }