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

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [largeImg, setlargeImg] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const per_page = 10;
  const refContainer = useRef(1);
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

  const fetchImage = async searchQuery => {
    console.log(
      '---fetchImage()---',
      'refContainer:',
      refContainer,
      'fetchImage-query:',
      searchQuery,
    );
    if (searchQuery === query) {
      return;
    } else {
      setPage(1);
      setQuery(searchQuery);
    }
    try {
      setIsLoading(true);
      const data = await getImage(searchQuery, page, per_page);
      setQuery(searchQuery);
      setImages(data.hits);
      setTotalHits(data.totalHits);
      setError(false);
      data.totalHits === 0 && notify();
      console.log('fetchImage-images.length', data.hits.length);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadMore = () => {
    if (query === null) {
      return;
    }
    setPage(state => state + 1);
  };
  useEffect(() => {
    console.log('useEffect-query:', query);
    if (refContainer.current === 1) {
      refContainer.current += 1;
      return;
    }
    // if (page === 1) {
    //   return;
    // }
    refContainer.current += 1;
    setIsLoading(true);
    try {
      console.log('---useEffect + fetch---', 'refContainer:', refContainer);
      getImage(query, page, per_page).then(r => {
        setImages(state => [...state, ...r.hits]);
        setTotalHits(r.totalHits);
        console.log('useEffect-images.length', r.hits.length);
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    // return () => {
    //   getImage();
    // };
  }, [page]);

  const loadMoreIsNeeded = totalHits > page * per_page ? true : false;
  // console.log('loadMoreIsNeeded', loadMoreIsNeeded);
  return (
    <>
      <SearchBar onQuery={fetchImage} />
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
      {console.log(refContainer)}
    </>
  );
};
