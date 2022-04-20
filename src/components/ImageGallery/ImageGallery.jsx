import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { StyledImgGallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, click }) => {
  return (
    <StyledImgGallery onClick={click}>
      <ImageGalleryItem images={images} />
    </StyledImgGallery>
  );
};
