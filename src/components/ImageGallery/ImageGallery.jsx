import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className="gallery">
      {images.map(image => (
        <li key={image.id}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() =>
              onClick({ src: image.urls.regular, alt: image.alt_description })
            }
          />
        </li>
      ))}
    </ul>
  );
}