import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { StyledImgGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, click }) => {
  return (
    <StyledImgGallery onClick={click}>
      <ImageGalleryItem images={images} />
    </StyledImgGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  click: PropTypes.func,
};
