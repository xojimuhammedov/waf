import EasyCropper from 'react-easy-crop';
import { useImageCropContext } from '../../../context/ImageCropProvider';

const Cropper = () => {
  const { image, zoom, setZoom, rotation, setRotation, crop, setCrop, onCropComplete }: any =
    useImageCropContext();

  return (
    <EasyCropper
      image={image || undefined}
      crop={crop}
      zoom={zoom}
      rotation={rotation}
      cropShape="round"
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      // setRotation={setRotation}
      showGrid={false}
      cropSize={{ width: 185, height: 185 }}
      style={{
        containerStyle: {
          height: 220,
          width: 220,
          top: 8,
          bottom: 8,
          left: 75,
          right: 50,
          position: 'relative'
        }
      }}
    />
  );
};

export default Cropper;
