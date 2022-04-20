import { StyledImageGalleryItem } from './ImageGalleryItem.styled';
import { StyledImage } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(image => (
        <StyledImageGalleryItem key={image.id}>
          <StyledImage
            src={image.webformatURL}
            data-src={image.largeImageURL}
            alt={image.id}
          />
        </StyledImageGalleryItem>
      ))}
    </>
  );
};
