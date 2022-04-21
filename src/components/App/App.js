import { useState, useEffect, useRef } from 'react';
import { Container, StyledButton } from 'components/App/App.styled';
import { SearchBar } from 'components/SearchBar/SearchBar.jsx';
import { ImageGallery } from 'components/ImageGallery/ImageGallery.jsx';
import { getImage } from 'api/service';
import { Modal } from 'components/Modal/Modal.jsx';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [largeImg, setlargeImg] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const refContainer = useRef(1);
  const onSetQuery = searchQuery => {
    if (searchQuery === query) {
      console.log('searchQuery === query');
      return;
    }
    console.log('searchQuery !== query');
    setQuery(searchQuery);
    setPage(1);
  };
  const per_page = 10;
  const notify = () =>
    toast.error('No images found', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  const toggleModal = () => {
    setModalIsOpen(prev => !prev);
  };

  const onImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      setlargeImg(e.target.dataset.src);
      toggleModal();
    }
  };
  const loadMore = () => {
    if (query === null) {
      return;
    }
    setPage(state => state + 1);
  };

  useEffect(() => {
    console.log('useEffect');

    if (refContainer.current === 1) {
      refContainer.current += 1;
      return;
    }
    setIsLoading(true);
    getImage(query, page, per_page)
      .then(r => {
        setImages(state => {
          if (page === 1) {
            return r.hits;
          }
          return [...state, ...r.hits];
        });
        r.totalHits === 0 && notify();
        setTotalHits(r.totalHits);
        setIsLoading(false);
      })
      .catch(e => {
        setImages([]);
        setError(e);
        setIsLoading(false);
      });
  }, [page, query]);

  const loadMoreIsNeeded = totalHits > page * per_page ? true : false;
  return (
    <>
      <SearchBar onQuery={onSetQuery} />
      <Container>
        <ToastContainer />
        {error && <h4>...Oops, something goes wrong!</h4>}
        <ImageGallery click={onImageClick} images={images} />
        {isLoading && (
          <>
            <Loader
              type="Bars"
              height="100"
              width="100"
              color="#3f51b5"
              ariaLabel="loading"
            />
            <h3>...loading</h3>
          </>
        )}
        {images.length !== 0 && loadMoreIsNeeded && (
          <StyledButton onClick={loadMore}>load More</StyledButton>
        )}
        {modalIsOpen && (
          <Modal
            toggleModal={toggleModal}
            modalImage={largeImg}
            alt={query}
          ></Modal>
        )}
      </Container>
    </>
  );
};
App.propTypes = {
  query: PropTypes.string,
  images: PropTypes.array,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  modalIsOpen: PropTypes.bool,
  largeImg: PropTypes.string,
  totalHits: PropTypes.number,
  searchQuery: PropTypes.string,
};
