import { useEffect, useState } from 'react';
import { getPhotos } from './Api/Api';
import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { Toaster } from 'react-hot-toast';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0);
  const [modal, setModal] = useState({ isOpen: false, src: '', alt: '' });

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    getPhotos(query, page)
      .then(data => {
        setImages(prevState => [...prevState, ...data.results]);
        setError(false);
        setTotalPages(data.total_pages);
        if (page > 1) {
          setTimeout(() => {
            window.scrollBy({
              top:
                document.querySelector('.image-card').getBoundingClientRect()
                  .height * 2,
              left: 0,
              behavior: 'smooth',
            });
          }, 100);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = value => {
    if (value !== query) {
      setImages([]);
      setPage(1);
      setQuery(value);
      setError(null);
      setTotalPages(0);
    }
  };

  const handleImageClick = ({ src, alt }) => {
    setModal({ isOpen: true, src, alt });
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}

      <div className="center">
        {isLoading && <Loader />}
        {error && <ErrorMessage />}

        {page < totalPage && images.length > 0 && !isLoading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </div>

      <Toaster position="top-right" />
      <ImageModal {...modal} onClose={() => setModal({ isOpen: false })} />
    </>
  );
}

export default App;
